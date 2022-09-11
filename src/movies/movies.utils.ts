import { Pagination } from './movies.dto'

export function paginate(
  url: string,
  limit: number,
  page: number,
  count: number
): Pagination {
  const start = 1
  const end = Math.ceil(count / limit)
  return {
    first_page: `${url}?limit=${limit}&page=1`,
    prev_page:
      page <= start ? undefined : `${url}?limit=${limit}&page=${page - 1}`,
    next_page:
      page >= end ? undefined : `${url}?limit=${limit}&page=${page + 1}`,
    last_page: `${url}?limit=${limit}&page=${end}`,
    current_page: page,
    per_page: limit,
    total_items: count,
  }
}
