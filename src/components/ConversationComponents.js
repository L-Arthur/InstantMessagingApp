import styled from "styled-components";
import {AiOutlineSmile, AiOutlineSend} from "react-icons/ai";
import {SearchContainer, SearchInput} from "./ContactListComponents";
import {useState} from "react";
import React from 'react';

// Styled components for ConversationComponent
const Container = styled.div`
  display : flex;
  flex-direction: column;
  height: 100%;
  flex: 2;
  background-color: #f6f7f8;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #ededed;
  padding: 15px;
  align-items: center;
  gap: 10px;
`;

const ProfileImage =styled.img`
width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChatBox =styled.div`
display: flex;
  background: #f0f0f0;
  padding: 10px;
  align-items: center;
  bottom: 0;
`;

const EmojiImage = styled(AiOutlineSmile)`
width: 30px;
  height: 28px;
  opacity: 0.4;
  padding-left: 5px;
  cursor: pointer;
`;

const MessageContainer =styled.div`
display: flex;
  flex-direction: column;
  height: 100%;
`;

const MessageDiv = styled.div`
  justify-content: ${(props) => (props.isYourMessage ? `flex-end` : `flex-start`)};
  display: flex;
  margin: 5px 16px;
`;

const Message = styled.div`
  position: relative;
  max-width: 50%;
  background: ${props => (props.isYourMessage ? '#daf8cb' : 'white')};
  color: #303030;
  padding: 16px 40px;
  font-size: 17px;
  border-radius: 16px;

  /* Styling for the timestamp */
  &:after {
    content: "${props => props.timestamp}"; // Display the timestamp
    font-size: 12px;
    color: #808080;
    position: absolute;
    bottom: 5px;
    right: 5px;
`;


const SendMessageButton = styled.button`
  background-color: #57d75f; 
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background-color: #0E6F5E;
  }
`;
const SendIcon = styled(AiOutlineSend)`
  color: white;
  font-size: 20px;
`;

// ConversationComponent function component
const ConversationComponent = ({ otherUser, messagesList, onSendMessage, currentUser }) => {

    // State for the input text of the message
    const [inputText, setInputText] = useState('');

    // Function to send a message
    const sendMessage = () => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const message = {
            type: 'message',
            senderID: currentUser.id,
            text: inputText,
            timestamp: timestamp,
            id: Date.now(), // Generate a unique ID for each message
        };

        console.log('Message:', message); // Log the message object
        // Call the provided onSendMessage function with the new message
        onSendMessage(message);
        // Clear the input text after sending the message
        setInputText('');
    };

    // Function to handle key press events, sending a message when Enter key is pressed
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <Container>
            {/* Profile header displaying the name and profile picture of the other user */}
            <ProfileHeader>
                <span>Conversation with: </span>
                <ProfileImage src={otherUser.profilePic} />
                <span>{otherUser.name}</span>
            </ProfileHeader>
            {/* Container for displaying messages */}
            <MessageContainer>
                {/* Map through the messagesList and render each message */}
                {messagesList.map(messageData => (
                    <MessageDiv key={messageData.id} isYourMessage={messageData.senderID === currentUser.id}>
                        {/* Render the message content */}
                        <Message isYourMessage={messageData.senderID === currentUser.id} timestamp={messageData.timestamp}>{messageData.text}</Message>
                    </MessageDiv>
                ))}
            </MessageContainer>
            {/* Chat box for typing and sending messages */}
            <ChatBox>
                {/* Container for input text and send message button */}
                <SearchContainer>
                    {/* Icon for opening emoji picker */}
                    <EmojiImage />
                    {/* Input field for typing messages */}
                    <SearchInput
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message"
                    />
                    {/* Button to send the message */}
                    <SendMessageButton onClick={sendMessage}>
                        <SendIcon />
                    </SendMessageButton>
                </SearchContainer>
            </ChatBox>
        </Container>
    );
};

export default ConversationComponent;