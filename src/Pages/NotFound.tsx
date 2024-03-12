import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const INITIAL_SECONDS = 3;

export default function NotFound() {
  const navigate = useNavigate();
  const [count, setCount] = useState(INITIAL_SECONDS);

  useEffect(() => {
    const countDown = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    if (count === 0) {
      navigate('/');
      clearInterval(countDown);
    }
    return () => clearInterval(countDown);
  }, [count, navigate]);

  return (
    <Wrapper>
      <h1>해당 페이지를 찾을 수 없습니다.</h1>
      <p>
        <strong>{count}초</strong> 뒤 자동으로 홈 화면으로 이동합니다.
      </p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 200px 60px 60px 60px;
  text-align: center;
  h1 {
    font-size: 36px;
    margin-bottom: 20px;
  }
  p {
    font-size: 24px;
    strong {
      color: ${(props) => props.theme.red};
    }
  }
`;
