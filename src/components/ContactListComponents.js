import styled from "styled-components";
import {users} from "../Data";
import { AiOutlineMore, AiOutlineMessage, AiOutlineReload, AiOutlineTeam, AiOutlineSearch } from "react-icons/ai";

// Styled container for the contact list component
const Container = styled.div`
display : flex;
flex-direction: column;
height: 100%;
flex: 0.8;
`;

// Styled container for profile information
const ProfileInfDiv = styled.div`
  display : flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #ededed;
  padding: 15px;
`;

// Styled profile image
const ProfileImage = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
  cursor: pointer;
`;

// Styled container for profile icons
const ProfileIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  cursor: pointer;
`;

// Styled individual icon
const IndividualIcon = styled.div`
  width: 28px;
  height: 28px;
  margin-left: 10px;
`;

// Styled search box container
const SearchBox = styled.div`
  display: flex;
  background: #f6f6f6;
  padding : 10px;
`;

// Styled search container
export const SearchContainer = styled.div`
display: flex;
flex-direction: row;
background: white;
border-radius: 16px;
width: 100%;
padding: 20px 0;
`;

// Styled search icon
const SearchIcon = styled(AiOutlineSearch)`
  width: 28px;
  height: 28px;
  padding-left: 10px;
`;

// Styled search input
export const SearchInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  padding-left: 15px;
  font-size: 17px;
  margin-left: 10px;
`;

// Styled contact item
const ContactItem =styled.div`
  display: flex;
  flex-direction: row;
  width: 94%;
  border-bottom: 1px solid #f2f2f2;
  background: white;
  cursor: pointer;
  padding: 15px;
`;

// Styled profile icon
const ProfileIcon = styled(ProfileImage)`
  width: 38px;
  height: 38px;
`;

// Styled contact name
const ContactName = styled.span`
  width: 100%;
  font-size: 16px;
  color: black;
`;

// Styled message text
const MessageText = styled.span`
  width: 100%;
  font-size: 14px;
  margin-top: 3px;
  color: rgba(0,0,0,0.8);
`;

// Styled message time
const MessageTime = styled.span`
  width: 20%;
  font-size: 14px;
  margin-top: 3px;
  color: rgba(0,0,0,0.8);
`;

// Styled contact information container
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 19px;
`;

// Functional component for a single contact item
const ContactComponent = ({ userData, onUserSelect }) => {

    // Handle click on a contact item
    const handleClick = () => {
        onUserSelect(userData);
    };

    // Render the contact item UI
    return (
        <ContactItem onClick={handleClick}>
            <ProfileIcon src={userData.profilePic} />
            <ContactInfo>
                <ContactName>{userData.name}</ContactName>
                <MessageText>{userData.lastText}</MessageText>
            </ContactInfo>
            <MessageTime>{userData.lastTextTime}</MessageTime>
        </ContactItem>
    );
};

// Main functional component for the Contact List Component
function ContactListComponent( { onUserSelect, currentUser }) {

    // Render the contact list UI
    return (
        <Container>
            {/* Profile Information Section */}
            <ProfileInfDiv>
                <ProfileImage src={currentUser.profilePic} />
                <span>{currentUser.name} (connected)</span>
                <ProfileIcons>
                    <IndividualIcon><AiOutlineTeam size={25} /></IndividualIcon>
                    <IndividualIcon><AiOutlineReload size={25} /></IndividualIcon>
                    <IndividualIcon><AiOutlineMessage size={25} /></IndividualIcon>
                    <IndividualIcon><AiOutlineMore size={25} /></IndividualIcon>
                </ProfileIcons>
            </ProfileInfDiv>

            {/* Search Box Section */}
            <SearchBox>
                <SearchContainer>
                    <SearchIcon />
                    <SearchInput placeholder="Search or start new chat" />
                </SearchContainer>
            </SearchBox>

            {/* Contact List Section */}
            {users.map(userData => (
                <ContactComponent
                    key={userData.id}
                    userData={userData}
                    onUserSelect={onUserSelect}
                />
            ))}
        </Container>
    );
}

export default ContactListComponent;