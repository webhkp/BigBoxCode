from .node import Node

class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.length = 0
        
    # Push item to the end
    def push(self, data):
        # Create a new node
        node = Node(data)
        
        # If there is no head, that means the list is empty
        # Then make this new node as head
        if not self.head:
            self.head = node
        else:
            # Set the new node as the next of the current tail
            self.tail.next = node
            
        # Set the new node as tail
        self.tail = node
        
        # Increase length by 1
        self.length += 1
        
    # Pop item from the end
    def pop(self):
        # Return None if the list is empty
        if not self.head:
            return None
        
        current = self.head
        new_tail = current
        
        # Traverse through the list 
        # and get the second last item as new_tail
        while current.next:
            new_tail = current
            current = current.next
            
        # Set the new tail
        self.tail = new_tail
        
        # Set next of the new tail as None
        self.tail.next = None
        
        # Decrease the length by 1
        self.length -= 1
        
        # If there is no item left
        # then set the head and tail both as None
        if self.length == 0:
            self.head = None
            self.tail = None
            
        # Return the node in the current variable
        return current
    
    # Shift the head
    # and maek the second item as the head
    # Return the first item as result of shift
    def shift(self):
        # If the current head is None,
        # then return None
        if self.head is None:
            return None
        
        old_head = self.head
        
        # Set the next node as head
        self.head = old_head.next
        
        # Decrease the length by 1
        self.length -= 1
        
        if self.length == 0:
            self.tail = None
            
        # Set the next of old_head to None
        # and return the old_head
        old_head.next = None
        
        return old_head
            
    # Unshift head
    # Create new node and set that as head
    def unshift(self, data):
        # Create a new node from provided data
        new_head = Node(data)
        
        if self.head is None:
            self.tail = new_head
        else:
            new_head.next = self.head
            
        # Set the new_head as head of the list
        self.head = new_head
        
        # Increase size of the list by 1
        self.length += 1
        
        return new_head
        
    # Get node by index(sequence numbers)
    # 0 based index (index starts from 0)
    def get(self, index):
        # Check if provided inex is valid
        # Return None if index is invalid
        if index < 0 or index >= self.length:
            return None
        
        selected_node = self.head
        
        # Start from head and go till the provided index
        for _ in range(index):
            selected_node = selected_node.next
            
        return selected_node
    
    # Set data of a specific node at specific index
    # 0 based index(index starts from 0)
    def set(self, index, data):
        node_at_index = self.get(index)
        
        # If item exists at index then return that
        if node_at_index is not None:
            node_at_index.data = data
            
            return True
        
        return False
    
    # Insert new node at a specific index
    # 0 based index(index starts at 0)
    def insert(self, index, data):
        # Return false if index is out of range
        if index < 0 or index > self.length:
            return False
        
        # If index is the next element after tail
        # then just push item to the lsit
        if index == self.length:
            self.push(data)
            
            return True
        
        # If index is zero then unshift
        if index == 0:
            self.unshift(data)
            
            return True
        
        # Create new node and add it to the defined index
        new_node = Node(data)
        
        # Get the node after which this new node will be inserted
        prev_node = self.get(index - 1)
        
        # Add the new_node after the prev_node
        new_node.next = prev_node.next
        prev_node.next = new_node
        
        # Increase length by one
        self.length += 1
        
        return True
          
    # Reemove item at specific index
    def remove(self, index):
        # Return false if index is out of range
        if index < 0 or index >= self.length:
            return None
        
        if index == 0:
            return self.shift()
        
        if index == self.length - 1:
            return self.pop()
        
        prev_node = self.get(index - 1)
        node_to_remove = prev_node.next
        prev_node.next = prev_node.next.next
        
        # Decrease length by 1
        self.length -= 1
        
        return node_to_remove 
        
    # Reverse a linked list
    def reverse(self):
        current_node = self.head
        prev_node = None
        next_node = None
        
        self.tail = self.head
        
        while current_node:
            next_node = current_node.next
            current_node.next = prev_node

            prev_node = current_node
            current_node = next_node

        self.head = prev_node
        
        return self
    
    # Search the list for specific data
    def search(self, data):
        current = self.head
        index = 0
        
        while current:
            if current.data == data:
                return index
            
            current = current.next
            index += 1
            
        return None
        
    
    def traverse(self):
        current = self.head
        
        while current:
            print(current.data, end=" -> ")
            
            # Move to the next node
            current = current.next
            