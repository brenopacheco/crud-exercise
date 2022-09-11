import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
} from '@nestjs/common'
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { ValidationError } from '../utils/exceptions'
import {
  Asset,
  ListMoviesQuery,
  Movie,
  MoviesList,
  MovieUpdate,
  Pagination,
} from './movies.dto'
import { listQuerySchema } from './movies.schemas'
import { MoviesService } from './movies.service'
import { paginate } from './movies.utils'

@Controller('ott/:account_id/movies')
@ApiTags('Movies')
@ApiExtraModels(Pagination, Asset, Movie, MoviesList, MovieUpdate)
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  @ApiOperation({
    summary: 'SHOULD BE ABLE TO GET THE LIST OF MOVIES FOR THIS ACCOUNT ID',
  })
  @ApiResponse({ status: 200, description: 'Success', type: MoviesList })
  @ApiResponse({ status: 400, description: 'Invalid query' })
  async findAll(
    @Param('account_id') account_id: string,
    @Query()
    query: ListMoviesQuery,
    @Req() req: Request
  ): Promise<MoviesList> {
    const parsedQuery = listQuerySchema.safeParse(query)
    if (!parsedQuery.success) throw new ValidationError(parsedQuery.error)
    const { page, limit } = parsedQuery.data
    const { movies, count } = await this.moviesService.findAll(
      account_id,
      page,
      limit
    )
    const pagination = paginate(req.url, limit, page, count)
    return { items: movies, ...pagination }
  }

  @Get(':movie_id')
  @ApiOperation({
    summary: 'SHOULD BE ABLE TO GET ONE MOVIE FOR THIS ACCOUNT ID BY MOVIE ID',
  })
  @ApiResponse({ status: 200, description: 'Success', type: Movie })
  @ApiResponse({ status: 404, description: 'Not found', type: Movie })
  async findOne(
    @Param('account_id') accountId: string,
    @Param('movie_id') movieId: number
  ): Promise<Movie> {
    return this.moviesService.findOne(accountId, movieId)
  }

  @Post()
  @ApiOperation({
    summary: 'SHOULD BE ABLE TO CREATE ONE MOVIE FOR THIS ACCOUNT ID',
  })
  @ApiResponse({ status: 201, description: 'Success', type: Movie })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  async create(
    @Param('account_id') accountId: string,
    @Body() body: MovieUpdate
  ): Promise<Movie> {
    return this.moviesService.createOne(accountId, body)
  }

  @Put(':movie_id')
  @ApiOperation({
    summary:
      'SHOULD BE ABLE TO UPDATE ONE MOVIE FOR THIS ACCOUNT ID BY MOVIE ID',
  })
  @ApiResponse({ status: 200, description: 'Success', type: Movie })
  @ApiResponse({ status: 404, description: 'Not found', type: Movie })
  @ApiResponse({ status: 400, description: 'Invalid data', type: Movie })
  async replace(
    @Param('account_id') accountId: string,
    @Param('movie_id') movieId: number,
    @Body() body: MovieUpdate
  ) {
    return this.moviesService.updateOne(accountId, movieId, body)
  }

  @Delete(':movie_id')
  @ApiOperation({
    summary:
      'SHOULD BE ABLE TO DELETE ONE MOVIE FOR THIS ACCOUNT ID BY MOVIE ID',
  })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async remove(
    @Param('account_id') accountId: string,
    @Param('movie_id') movieId: number
  ) {
    await this.moviesService.deleteOne(accountId, movieId)
    return { message: 'Movie deleted' }
  }
}
