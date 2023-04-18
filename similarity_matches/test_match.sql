create or replace function test_match_vector(embedding vector(1536), match_count bigint, val text)
returns table (id bigint, value text, similarity float)
language plpgsql
as $$
begin
    return query
    select  
        test_embeddings.id, 
        test_embeddings.value, 
        (test_embeddings.vector <#> embedding) * -1 as similarity
    from test_embeddings
    where val != test_embeddings.value
    order by test_embeddings.vector <#> embedding
    limit match_count;
end;
$$;