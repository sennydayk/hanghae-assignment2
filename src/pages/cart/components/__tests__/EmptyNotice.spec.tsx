import { screen } from '@testing-library/react';
import customRender from '@/utils/test/render';
import { EmptyNotice } from '../EmptyNotice';
import { useNavigate } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}));

it('"홈으로 가기" 링크를 클릭할 경우 "/" 경로로 navigate 함수가 호출된다', async () => {
  // Arrange: EmptyNotice 컴포넌트를 렌더링
  const mockNavigate = vi.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  const { user } = await customRender(<EmptyNotice />);

  // Act: "홈으로 가기" 텍스트를 가진 요소를 클릭
  const goHome = screen.getByText('Go Home');
  await user.click(goHome);

  // Assert: navigate 함수가 '/' 경로로 호출되었는지 확인
  expect(mockNavigate).toHaveBeenCalledWith('/');
});
