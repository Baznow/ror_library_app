class V1::TopBooksController < ApplicationController
    def index
        @top_books = BookPass.find_by_sql(['
        select b.* 
        from (
            select book_id, count(*) as count
            from book_passes
            group by book_id
            order by count
            limit 11) p
        left join books b
        on p.book_id = b.id
        where b.library_id = ?', params[:id]])
        render json: @top_books, status: :ok
    end
end
