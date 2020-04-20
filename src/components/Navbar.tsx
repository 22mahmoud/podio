import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  ${tw`flex justify-between`};
  input {
    ${tw`p-2 text-gray-900 rounded w-64`};
  }
`;

const Logo = styled(Link)`
  ${tw`
    text-2xl uppercase font-bold 
    hover:text-gray-500 
    ease-in transition-all duration-100
  `};
`;

const Navbar: React.FC<{}> = () => {
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Submited');
  };

  return (
    <Wrapper>
      <Logo to="/">Logo</Logo>
      <ul>
        <li>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="search"
              placeholder="search for genres, stations, or podcasts"
            />
          </form>
        </li>
      </ul>
    </Wrapper>
  );
};

export default Navbar;
