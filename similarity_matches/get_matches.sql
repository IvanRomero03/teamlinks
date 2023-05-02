
--cambiar nombres de tablas
--checar el order by

create or replace function get_matches_test(recruiterId text, proyectId text, positionId text, min_similarity float)
returns table (id text, similarity float)
language plpgsql
as $$
begin
    return query
    select  
        applications.id,
        (((applications.vector <#> (SELECT positions.vector WHERE id = positionId)) * -1) + ((applications.vector <#> (SELECT proyectos.vector WHERE id = proyectId)) * -1) + ((applications.vector <#> (SELECT recruiters.vector WHERE id = recruiterId)) * -1))/4  as similarity
    from applications
    WHERE similarity >= min_similarity
    order by similarity DESC;
end;
$$;