import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger'

export class ListMoviesQuery {
  @ApiPropertyOptional({
    description:
      'Page number of the elements to be requested from server. one-indexed',
    type: Number,
    default: 1,
  })
  page?: number

  @ApiPropertyOptional({
    description:
      'The requested maximum number of collection items to return for a single request.',
    default: 50,
  })
  limit?: number
}

export class Pagination {
  @ApiProperty({ description: 'First page URL' })
  first_page: string

  @ApiPropertyOptional({ description: 'Previous page URL', type: String })
  prev_page: string | undefined

  @ApiPropertyOptional({ description: 'Next page URL', type: String })
  next_page: string | undefined

  @ApiProperty({ description: 'Last page URL' })
  last_page: string

  @ApiProperty({ description: 'Number of items per page' })
  per_page: number

  @ApiProperty({ description: 'Current page number' })
  current_page: number

  @ApiProperty({ description: 'Total of assets' })
  total_items: number
}

export class Asset {
  @ApiProperty({ description: 'Asset id', example: 1 })
  id: number

  @ApiProperty({
    description:
      'Publication status of the asset, 1 = published, 0 = not published',
    example: 1,
  })
  published: boolean

  @ApiProperty({ description: 'Production country' })
  production_country: string[]

  @ApiProperty({ description: 'Actors' })
  actors: string[]

  @ApiProperty({ description: 'Directors' })
  directors: string[]
}

export class Movie extends Asset {
  @ApiProperty({ example: '2020-07-08T16:31:49.000Z' })
  created_at: Date

  @ApiProperty({ example: '2020-07-08T16:31:49.000Z' })
  updated_at: Date

  @ApiProperty({ example: 'Avengers Endgame' })
  original_title: string

  @ApiProperty({ example: 2020 })
  production_year: string

  @ApiProperty({ example: '1680608156245230581' })
  video_id: string

  @ApiProperty({ example: 'localhost:3000/movies/1.jpg' })
  poster: string
}

export class MoviesList extends Pagination {
  @ApiProperty({ description: 'The list of movies', type: [Movie] })
  items: Movie[]
}

export class MovieUpdate extends OmitType(Movie, [
  'id',
  'created_at',
  'updated_at',
] as const) {}

export class MoviePartialUpdate extends PartialType(
  OmitType(Movie, ['id', 'created_at', 'updated_at'] as const)
) {}
