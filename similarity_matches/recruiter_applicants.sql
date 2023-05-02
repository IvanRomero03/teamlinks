create or replace function recruiter_applicants_matches(embedding vector(1536), match_count bigint)
returns table (id bigint, value text, similarity float)
language plpgsql
as $$
begin
    return query
    select  
        applications.id, 
        (applications.vector <#> embedding) * -1 as similarity
    from applications
    order by applications.vector <#> embedding
    limit match_count;
end;
$$;