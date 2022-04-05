SELECT p_grid.X,p_grid.Y,p_grid.GridX,p_grid.GridY,p_grid.[test1],
Year(Date) as Year,MONTH(Date) as Month,DATEPART(quarter,Date) as Quarter,
    ISNULL(S5.EventCnt,0) AS EventCntR500, ISNULL(S5.SumSmth,0) AS SumSmth5,
	ISNULL(S1.EventCnt,0) AS EventCntR1000, ISNULL(S1.SumSmth,0) AS SumSmth10
  FROM
  [dbo].[Test] p_grid
  LEFT JOIN
-- Get event counts within 500m
   (SELECT P.X,P.Y,COUNT(Smth) AS SmthCnt, SUM(Smth) AS SumSmth
    FROM [dbo].[Test2] AS P
    INNER JOIN [dbo].[Test3] AS S ON SQRT(POWER(P.X-S.X,2)+POWER(P.Y-S.Y,2))<500
	and S.[Event_Year]=Year(P.Date) and S.Event_Month=MONTH(P.Date)
    WHERE S.[GridX] between P.[GridX]-1000 and P.[GridX]+1000 and
	S.[GridY] between P.[GridY]-1000 and P.[GridY]+1000
    GROUP BY P.X,P.Y
   ) AS S5 ON p_grid.X=S5.X and p_grid.Y=S5.Y
