import { Injectable, Logger } from '@nestjs/common'
import { MovieData, Prisma } from '@prisma/client'
import { MissingEntityError, ValidationError } from '../utils/exceptions'
import { PrismaService } from '../utils/prisma.service'
import { Movie, MovieUpdate } from './movies.dto'
import { movieSchema } from './movies.schemas'

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name)
  constructor(private prisma: PrismaService) {}

  /**
   * Find all movies from account, paginated
   * @param accountId - Account id
   * @param page - pagination page number
   * @param limit - resolve N entries
   * @throws {MissingEntityError}
   * @throws {unknown} unhandled exceptions
   */
  async findAll(
    accountId: string,
    page: number,
    limit: number
  ): Promise<{ movies: MovieData[]; count: number }> {
    this.logger.debug('findAll:', { accountId, page, limit })
    const skip = limit * (page - 1)
    const account = await this.prisma.accountData.findUnique({
      where: { id: accountId },
      include: {
        movies: { skip, take: limit },
        _count: { select: { movies: true } },
      },
    })
    if (!account) throw new MissingEntityError('Account')
    return { movies: account.movies, count: account._count.movies }
  }

  /**
   * Find a movie from account
   * @param accountId - Account id
   * @param movieId - Movie id
   * @throws {MissingEntityError}
   * @throws {unknown} unhandled exceptions
   */
  async findOne(accountId: string, movieId: number): Promise<MovieData> {
    this.logger.debug('findOne:', { accountId, movieId })
    const movie = await this.prisma.movieData.findUnique({
      where: { key: { id: movieId, account_id: accountId } },
    })
    if (!movie) throw new MissingEntityError('Account or Movie')
    return movie
  }

  /**
   * Create a movie
   * @param accountId - Account id
   * @param data - Movie data
   * @throws {MissingEntityError}
   * @throws {InvalidEntityError}
   * @throws {unknown} unhandled exceptions
   */
  async createOne(accountId: string, data: MovieUpdate): Promise<Movie> {
    this.logger.debug('createOne:', { accountId, data })
    const model = movieSchema.safeParse(data)
    if (!model.success) throw new ValidationError(model.error)
    try {
      return await this.prisma.movieData.create({
        data: { ...model.data, account_id: accountId },
      })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        if (err.code == 'P2003') throw new MissingEntityError('Account')
      this.logger.error(err)
      throw err
    }
  }

  /**
   * Update movie contents
   * @param accountId - Account id
   * @param movieId - Movie id
   * @param data - Movie data
   * @throws {MissingEntityError}
   * @throws {InvalidEntityError}
   * @throws {unknown} unhandled exceptions
   */
  async updateOne(
    accountId: string,
    movieId: number,
    data: MovieUpdate
  ): Promise<Movie> {
    this.logger.debug('updateOne', { accountId, movieId, data })
    const model = movieSchema.safeParse(data)
    if (!model.success) throw new ValidationError(model.error)
    try {
      return await this.prisma.movieData.update({
        where: { key: { id: movieId, account_id: accountId } },
        data: { ...model.data },
      })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        if (err.code == 'P2025')
          throw new MissingEntityError('Account or Movie')
      this.logger.error(err)
      throw err
    }
  }

  /**
   * Delete movie from account
   * @param accountId - Account id
   * @param movieId - Movie id
   * @throws {MissingEntityError}
   * @throws {unknown} unhandled exceptions
   */
  async deleteOne(accountId: string, movieId: number): Promise<void> {
    this.logger.debug('deleteOne:', { accountId, movieId })
    try {
      await this.prisma.movieData.delete({
        where: { key: { id: movieId, account_id: accountId } },
      })
    } catch (err: unknown) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        if (err.code === 'P2025') throw new MissingEntityError('Movie')
      this.logger.error(err)
      throw err
    }
  }
}
