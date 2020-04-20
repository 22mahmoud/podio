import React, { useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

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
  const history = useHistory();
  const [searchValue, setSerachValue] = useState('');

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    history.push(`/search/${searchValue}`);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSerachValue(event.target.value);
  };

  return (
    <Wrapper>
      <Logo to="/">Logo</Logo>
      <ul>
        <li>
          <form onSubmit={handleSearchSubmit}>
            <input
              value={searchValue}
              onChange={handleSearchInputChange}
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
