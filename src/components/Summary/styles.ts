import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -7rem;
`;

interface SummaryCardProps {
  activeColor?: 'green' | 'red';
}

const colors = {
  red: '#e52e4d',
  green: '#33cc95'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: var(--shape);
  padding: 1.5rem 2rem;
  border-radius: 0.25rem;
  color: var(--text-title);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
    font-weight: 500;  
    line-height: 3rem;
  }

  &.highlight-background {
    background: ${({ activeColor }) => activeColor && colors[activeColor] };
    color: #fff;
  }
`;