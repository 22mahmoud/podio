import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';

const Wrapper = styled.div`
  ${tw`flex justify-between`};
  input {
    ${tw`p-2 text-gray-900 rounded w-64`};
  }
`;

const Logo = tw.a`
  text-2xl uppercase font-bold 
  hover:text-gray-500 
  ease-in transition-all duration-100
`;

const Navbar: React.FC<{}> = () => {
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Submited');
  };

  return (
    <Wrapper>
      <Logo href="/"> Logo </Logo>
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
