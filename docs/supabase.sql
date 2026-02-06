/*Used postgreSQL functions in Supabase*/

/* select_article_by_theme*/

CREATE OR REPLACE FUNCTION select_article_by_theme(
  search_text TEXT
)
RETURNS TABLE (
  id INT8,
  date TEXT,
  title TEXT,
  detail TEXT,
  cover_img_id TEXT,
  author TEXT,
  category TEXT,
  paywall BOOLEAN,
  locked BOOLEAN
)AS $$
BEGIN
  RETURN QUERY
  select article.id, article.date, article.title, article.detail, article.cover_img_id, article.author, article.category, article.paywall, article.locked from article
  where exists (
    SELECT 1 FROM unnest(article.keyword) AS elem
    WHERE elem ilike '%' || search_text || '%'
  );
END;
$$ LANGUAGE plpgsql;



/* select_article_by_text18*/

CREATE OR REPLACE FUNCTION select_article_by_text19(
    search_text TEXT ,
    author_filter TEXT DEFAULT NULL,
    start_date TEXT DEFAULT NULL,
    end_date TEXT DEFAULT NULL,
    page INT DEFAULT 1,
    category_filter TEXT DEFAULT NULL
)
RETURNS TABLE (
    id INT8,
    date TEXT,
    title TEXT,
    detail TEXT,
    cover_img_id TEXT,
    author TEXT,
    category TEXT,
    paywall BOOLEAN,
    locked BOOLEAN
)AS $$
BEGIN
  RETURN QUERY
  SELECT article.id, article.date, article.title, article.detail, article.cover_img_id, article.author, article.category, article.paywall, article.locked
  FROM article
  WHERE 
    (article.search_art ILIKE '%' || search_text || '%')
    AND (author_filter IS NULL OR article.author = author_filter)
    AND (start_date IS NULL OR article.date >= start_date)
    AND (end_date IS NULL OR article.date <= end_date)
    AND (NOT 
      exists (
    SELECT 1 FROM unnest(article.keyword) AS elem
    WHERE elem ilike '%' || search_text || '%'
    )
    )
    AND NOT (article.title ILIKE '%' || search_text || '%')
    AND (category_filter IS NULL OR category_filter = article.category)
    ORDER BY article.id DESC
    LIMIT 20
    OFFSET (greatest(page, 1)-1) * 20;
END;
$$ LANGUAGE plpgsql;


/* settitle*/

CREATE OR REPLACE FUNCTION settitle(p_title TEXT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO titles (title, number)
  VALUES (p_title, 1)
  ON CONFLICT (title)
  DO UPDATE SET number = titles.number + 1;
END;
$$ LANGUAGE plpgsql;


/* settheme*/

CREATE OR REPLACE FUNCTION settheme(p_theme TEXT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO themes (theme, number)
  VALUES (p_theme, 1)
  ON CONFLICT (theme)
  DO UPDATE SET number = themes.number + 1;
END;
$$ LANGUAGE plpgsql;


/* get_number_daily_readership3*/

CREATE OR REPLACE FUNCTION get_number_daily_readership3(year Text)
RETURNS TABLE (formatted_date DATE,  article_count bigint) AS $$
BEGIN
  RETURN QUERY
  SELECT
    TO_DATE(date, 'YYYY. MM. DD') AS formatted_date,
    COUNT(*) AS article_count
  FROM
    numberClickArticle
    where numberclickarticle.date like year
  GROUP BY
    formatted_date
  ORDER BY
    formatted_date;
END;
$$ LANGUAGE plpgsql;


/* get_readership_per_month6*/

CREATE OR REPLACE FUNCTION get_readership_per_month6(year text)
RETURNS TABLE (month TEXT,  article_count bigint) AS $$
BEGIN
  RETURN QUERY
  SELECT
    Extract(month FROM TO_DATE(date, 'YYYY. MM. DD.'))::TEXT AS month,
    COUNT(*) AS article_count
  FROM
    numberclickarticle
    where numberclickarticle.date like year
  GROUP BY
    month
  ORDER BY
    month;
END;
$$ LANGUAGE plpgsql;


/* get_readership_article11*/

CREATE OR REPLACE FUNCTION get_readership_article11(click_date TEXT)
RETURNS TABLE (tit TEXT, dat TEXT, cat TEXT,  article_count bigint) AS $$
BEGIN
  RETURN QUERY
  SELECT
    numberclickarticle.title as tit, article.date as dat, article.category as cat,
    COUNT(*) AS article_count
  FROM
    numberclickarticle
    INNER JOIN
    article
    ON
    article.title = numberclickarticle.title
    where TO_DATE(numberclickarticle.date, 'YYYY. MM. DD.')  >= TO_DATE(click_date, 'YYYY. MM. DD.') 
  GROUP BY
    tit, dat, cat
  ORDER BY
   article_count desc
   limit 20;
END;
$$ LANGUAGE plpgsql;


/* get_readership_article_source5*/

CREATE OR REPLACE FUNCTION get_readership_article_source5(year Text)
RETURNS TABLE (so TEXT,  article_count bigint) AS $$
BEGIN
  RETURN QUERY
  SELECT
    numberclickarticle.source as so,
    COUNT(*) AS article_count
  FROM
    numberclickarticle
  where (numberclickarticle.source = 'facebook' or numberclickarticle.source = 'x' or numberclickarticle.source = 'newsletter')
  and numberclickarticle.date like year
  GROUP BY
    so
  ORDER BY
   article_count;
END;
$$ LANGUAGE plpgsql;


/* get_share_article4*/

CREATE OR REPLACE FUNCTION get_share_article4(year Text)
RETURNS TABLE (sh TEXT,  article_count bigint) AS $$
BEGIN
  RETURN QUERY
  SELECT
    share.share as sh,
    COUNT(*) AS article_count
  FROM
    share
  where share.date like year
  GROUP BY
    share
  ORDER BY
   article_count;
END;
$$ LANGUAGE plpgsql;
