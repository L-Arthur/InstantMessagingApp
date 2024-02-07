import styled from "styled-components";
import React, {useEffect, useState} from 'react';
import ContactListComponent from "./components/ContactListComponents";
import ConversationComponent from "./components/ConversationComponents";
import {users} from "./Data";

// Styled container for the entire application
const Container = styled.div`
display : flex;
flex-direction: row;
height: 100vh;
width: 100%;
background: #f8f9fb;
  
`// Main App component
function App() {


    // State for the selected user and messages list
    const [selectedUser, setSelectedUser] = useState(users[0]);
    const [messagesList, setMessagesList] = useState([]);

    // Determine the other user (user1 or user2)
    const [otherUser, setOtherUser] = useState(users[1]);

    // Update otherUser whenever selectedUser changes
    useEffect(() => {
        if (selectedUser === users[0]) {
            setOtherUser(users[1]);
        } else if (selectedUser === users[1]) {
            setOtherUser(users[0]);
        }
    }, [selectedUser]);

    // Function to handle user selection
    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };
    // Function to handle sending messages
    const handleSendMessage = (message) => {
        setMessagesList((prevMessages) => [...prevMessages, message]);
    };
    // Render the UI
    return (
      <Container>
          {/* Contact List Component */}
          <ContactListComponent
              onUserSelect={handleUserSelect}
              currentUser={selectedUser}
          />
          {/* Conversation Component */}
          {selectedUser && (
            <ConversationComponent
              otherUser={otherUser}
              messagesList={messagesList}
              onSendMessage={handleSendMessage}
              currentUser={selectedUser}
            />
          )}
      </Container>
  );
}

export default App;
