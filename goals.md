Sumbar: shows progress through a course/unit/task in a bar
Integrate with formbar to show progress over time

- formbar auth and db
- db tables unit/course, questions
- random/selected quiz
- copy detector
- tutd per question
- attach to class, teacher see all results
- teacher new question input



SELECT 
    t.TaskID,
    t.TaskName,
    t.Instructions,
    u.UnitName,
    c.CourseName
FROM 
    Tasks t
JOIN 
    Units u ON t.UnitID = u.UnitID
JOIN 
    Courses c ON u.CourseID = c.CourseID
WHERE 
    c.CourseID = ? -- Replace '?' with the CourseID
ORDER BY 
    u.SortOrder, t.SortOrder;