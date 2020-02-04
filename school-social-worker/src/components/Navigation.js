import React from 'react';
import styled from 'styled-components';
import LogoImg from '../assets/ghana-make-a-difference.png';
import { Link} from 'react-router-dom';


const Navigation = () => {

const NavigationStyles = styled.div`
display: flex;
color: white;
background: #fff;
padding: 0px;
margin: 0px;

`;

const Logo = styled.img`
width: 120px;
justify-content: center;
align-items: center;
`;

const LogoContainer = styled.div`
display: flex;
padding: 10px 80px;

@media (max-width: 600px) {
    display: none;
  }
`;

const NavLinks = styled.div`
display: flex;
width: 100%;
justify-content: flex-end;
align-items: center;
font-size: 1.8rem;

@media (max-width: 600px) {
    justify-content: space-around;
    font-size: 1.4rem;
  }
`;
const Links = styled.div`
padding: 10px;
margin: 10px;
color: #000;
font-family: 'Manjari', sans-serif;
`;



    return (
        <>
        <NavigationStyles>
            <LogoContainer>
                <Logo src={LogoImg} />
            </LogoContainer>
            <NavLinks>
                <Links>Account</Links>
                <Links>Sign out</Links>
            </NavLinks>
        </NavigationStyles>
            
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
          <Link to='/'>Student List</Link>
          <Link to='/create-student-profile'>Create Student Profile</Link>
          <Link to='/single-child-view'>Single Child View</Link>
          <Link to='/single-child-edit'>Single Child Edit</Link>
        
        </>
    )
}

export default Navigation;