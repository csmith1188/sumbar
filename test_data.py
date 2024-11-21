# Challenge 1: Sum of Even Numbers
dataset1 = [1, 2, 3, 4, 5, 6]
dataset2 = [10, 15, 20, 25]
dataset3 = [7, 9, 11, 13]

def sum_of_evens(numbers):
    pass

print("Sum of evens (test 1):", sum_of_evens(dataset1))  # Expected: 12
print("Sum of evens (test 2):", sum_of_evens(dataset2))  # Expected: 30
print("Sum of evens (test 3):", sum_of_evens(dataset3))  # Expected: 0

###############################################################################

# Challenge 2: Count Occurrences
dataset1 = (['apple', 'banana', 'apple', 'cherry'], 'apple')
dataset2 = ([1, 2, 3, 2, 4], 2)
dataset3 = ('banana banana apple banana'.split(), 'banana')

def count_occurrences(lst, value):
    pass

print("Count occurrences (test 1):", count_occurrences(*dataset1))  # Expected: 2
print("Count occurrences (test 2):", count_occurrences(*dataset2))  # Expected: 2
print("Count occurrences (test 3):", count_occurrences(*dataset3))  # Expected: 3

###############################################################################

# Challenge 3: Common Elements
dataset1_3 = ([1, 2, 3], [3, 4, 5])
dataset2_3 = (['a', 'b', 'c'], ['c', 'd', 'e'])
dataset3_3 = ([10, 20, 30], [40, 50, 60])

def common_elements(list1, list2):
    pass

print("Common elements (test 1):", common_elements(*dataset1_3))  # Expected: [3]
print("Common elements (test 2):", common_elements(*dataset2_3))  # Expected: ['c']
print("Common elements (test 3):", common_elements(*dataset3_3))  # Expected: []

###############################################################################

# Challenge 4: Flatten a List
dataset1_4 = [[1, 2], [3, 4], [5]]
dataset2_4 = [[], [1, 2, 3], []]
dataset3_4 = [[10, 20], [30], [40, 50, 60]]

def flatten(nested_list):
    pass

print("Flattened list (test 1):", flatten(dataset1_4))  # Expected: [1, 2, 3, 4, 5]
print("Flattened list (test 2):", flatten(dataset2_4))  # Expected: [1, 2, 3]
print("Flattened list (test 3):", flatten(dataset3_4))  # Expected: [10, 20, 30, 40, 50, 60]

###############################################################################

# Challenge 5: Filter Strings
dataset1_5 = [1, 'apple', 2, 'banana', 3]
dataset2_5 = ['hello', 123, 'world']
dataset3_5 = [True, 'yes', 42, 'no']

def filter_strings(lst):
    pass

print("Filtered strings (test 1):", filter_strings(dataset1_5))  # Expected: ['apple', 'banana']
print("Filtered strings (test 2):", filter_strings(dataset2_5))  # Expected: ['hello', 'world']
print("Filtered strings (test 3):", filter_strings(dataset3_5))  # Expected: ['yes', 'no']

###############################################################################

# Challenge 6: Prime Number Filter
dataset1_6 = [2, 3, 4, 5]
dataset2_6 = [10, 11, 12, 13]
dataset3_6 = [17, 19, 22, 23]

def filter_primes(numbers):
    pass

print("Prime numbers (test 1):", filter_primes(dataset1_6))  # Expected: [2, 3, 5]
print("Prime numbers (test 2):", filter_primes(dataset2_6))  # Expected: [11, 13]
print("Prime numbers (test 3):", filter_primes(dataset3_6))  # Expected: [17, 19, 23]

###############################################################################

# Challenge 7: Remove Duplicates
dataset1_7 = [1, 2, 2, 3]
dataset2_7 = ['a', 'b', 'a', 'c']
dataset3_7 = [10, 20, 10, 20, 30]

def remove_duplicates(lst):
    pass

print("Without duplicates (test 1):", remove_duplicates(dataset1_7))  # Expected: [1, 2, 3]
print("Without duplicates (test 2):", remove_duplicates(dataset2_7))  # Expected: ['a', 'b', 'c']
print("Without duplicates (test 3):", remove_duplicates(dataset3_7))  # Expected: [10, 20, 30]

###############################################################################

# Challenge 8: Generate Multiples
dataset1_8 = (3, 5)
dataset2_8 = (4, 3)
dataset3_8 = (7, 4)

def generate_multiples(n, count):
    pass

print("Multiples (test 1):", generate_multiples(*dataset1_8))  # Expected: [3, 6, 9, 12, 15]
print("Multiples (test 2):", generate_multiples(*dataset2_8))  # Expected: [4, 8, 12]
print("Multiples (test 3):", generate_multiples(*dataset3_8))  # Expected: [7, 14, 21, 28]

###############################################################################

# Challenge 9: Cumulative Sum
dataset1_9 = [1, 2, 3, 4]
dataset2_9 = [10, 20, 30]
dataset3_9 = [5, 5, 5, 5]

def cumulative_sum(numbers):
    pass

print("Cumulative sum (test 1):", cumulative_sum(dataset1_9))  # Expected: [1, 3, 6, 10]
print("Cumulative sum (test 2):", cumulative_sum(dataset2_9))  # Expected: [10, 30, 60]
print("Cumulative sum (test 3):", cumulative_sum(dataset3_9))  # Expected: [5, 10, 15, 20]

###############################################################################

# Challenge 10: Shift Elements
dataset1_10 = ([1, 2, 3, 4, 5], 2)
dataset2_10 = ([10, 20, 30, 40], 1)
dataset3_10 = ([7, 8, 9], 3)

def shift_elements(lst, k):
    pass

print("Shifted list (test 1):", shift_elements(*dataset1_10))  # Expected: [4, 5, 1, 2, 3]
print("Shifted list (test 2):", shift_elements(*dataset2_10))  # Expected: [40, 10, 20, 30]
print("Shifted list (test 3):", shift_elements(*dataset3_10))  # Expected: [7, 8, 9]
