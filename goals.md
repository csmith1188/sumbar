Sumbar: shows progress through a course/unit/task in a bar
Integrate with formbar to show progress over time

- ~~formbar auth~~ and db update (do i need a table or is fb_id enough?)
- ~~db tables unit/course, questions~~
- teacher makes quizzes per class
- teacher see all results
- random/selected quiz
- secure running python
- copy detector
- tutd per question
- teacher new question input



SELECT t.uid, t.name, t.desc, u.name, c.name FROM tasks t JOIN units u ON t.unit_id = u.uid JOIN courses c ON u.course_id = c.uid WHERE c.uid = ? ORDER BY u.sortOrder, t.sortOrder;