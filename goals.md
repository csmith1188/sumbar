Sumbar: shows progress through a course/unit/task in a bar
Integrate with formbar to show progress over time

- ~~formbar auth~~
- ~~db tables unit/course, questions~~
- ~~secure running python~~
- ~~tutd per question~~

- ~~edit test add/remove existing problems~~
- edit problem to edit, test or create new problem
- assign tests to students ~~or class~~
- no matching id/test_id/class_code/user_id in assignments

- student see own results
- teacher see all results
- copy tests to classes
- random/selected test
- copy detector

SELECT t.uid, t.name, t.desc, u.name, c.name FROM tasks t JOIN units u ON t.unit_id = u.uid JOIN courses c ON u.course_id = c.uid WHERE c.uid = ? ORDER BY u.sortOrder, t.sortOrder;