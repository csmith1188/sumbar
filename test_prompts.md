10 Lists/Loops/Functions Challenges

**1. Sum of Even Numbers**

Write a function sum_of_evens(numbers) that takes a list of integers and returns the sum of all even numbers.

-   Input: [1, 2, 3, 4, 5, 6]
-   Output: 12

def sum_of_evens(numbers):
	total = 0
	for num in numbers:
		if not num % 2:
			total += num
	return total

* * * * *

**2. Count Occurrences**

Write a function count_occurrences(lst, value) that takes a list and a value as input, and returns how many times the value appears in the list.

-   Input: ['apple', 'banana', 'apple', 'cherry'], 'apple'
-   Output: 2

def count_occurrences(lst, value):
	total = 0
	for fruit in lst:
		if fruit == value:
			total += 1
	return total

* * * * *

**3. Common Elements**

Write a function common_elements(list1, list2) that returns a list of elements common to both input lists (no duplicates).

-   Input: [1, 2, 3, 4], [3, 4, 5, 6]
-   Output: [3, 4]

* * * * *

**4. Flatten a List**

Write a function flatten(nested_list) that takes a list of lists and returns a single flattened list.

-   Input: [[1, 2], [3, 4], [5]]
-   Output: [1, 2, 3, 4, 5]

* * * * *

**5. Filter Strings**

Write a function filter_strings(lst) that takes a list containing integers and strings, and returns a new list with only the strings.

-   Input: [1, 'apple', 2, 'banana', 3]
-   Output: ['apple', 'banana']

**6. Prime Number Filter**

Write a function filter_primes(numbers) that takes a list of integers and returns a new list containing only the prime numbers.

-   Input: [2, 3, 4, 5, 6, 7]
-   Output: [2, 3, 5, 7]

* * * * *

**7. Remove Duplicates**

Write a function remove_duplicates(lst) that takes a list and returns a new list with duplicates removed (order preserved).

-   Input: [1, 2, 2, 3, 4, 4, 5]
-   Output: [1, 2, 3, 4, 5]

* * * * *

**8. Generate Multiples**

Write a function generate_multiples(n, count) that generates a list of the first count multiples of n.

-   Input: 3, 5
-   Output: [3, 6, 9, 12, 15]

* * * * *

**9. Cumulative Sum**

Write a function cumulative_sum(numbers) that takes a list of numbers and returns a new list where each element is the cumulative sum of the list up to that index.

-   Input: [1, 2, 3, 4]
-   Output: [1, 3, 6, 10]

* * * * *

**10. Shift Elements**

Write a function shift_elements(lst, k) that takes a list and an integer k, and returns a new list where the elements are shifted to the right by k places (wrap around to the beginning).

-   Input: [1, 2, 3, 4, 5], 2
-   Output: [4, 5, 1, 2, 3]