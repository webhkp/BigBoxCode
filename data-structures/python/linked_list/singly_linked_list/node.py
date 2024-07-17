class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        
    def __str__(self):
        return self.data