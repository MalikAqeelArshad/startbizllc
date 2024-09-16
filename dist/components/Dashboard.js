import { ApiClient } from 'adminjs';
import React, { useEffect, useState } from 'react';
import { Box, H2, H5, Illustration, Text } from '@adminjs/design-system';
import { styled } from '@adminjs/design-system/styled-components';
import RocketSVG from '../utils/rocket-svg.js';
const pageHeaderHeight = 300;
const pageHeaderPaddingY = 74;
const pageHeaderPaddingX = 250;
export const DashboardHeader = () => {
    return (React.createElement(Box, { "data-css": "default-dashboard" },
        React.createElement(Box, { position: "relative", overflow: "hidden", bg: "white", height: pageHeaderHeight, py: pageHeaderPaddingY, px: ['default', 'lg', pageHeaderPaddingX] },
            React.createElement(Box, { position: "absolute", top: 30, left: 0, opacity: 0.9, animate: true, display: ['none', 'none', 'none', 'block'] },
                React.createElement(RocketSVG, null)),
            React.createElement(Text, { textAlign: "center", color: "grey100" },
                React.createElement(H2, { fontWeight: "bold" }, "Welcome to Startbiz"),
                React.createElement(Text, { opacity: 0.8 }, "Your Digital Dreams, Our Web Mastery !")))));
};
const boxes = (data) => [
    {
        variant: 'Details',
        title: 'Ongoing Tasks',
        subtitle: data.completedTasks,
        href: '/admin/resources/ongoing',
    },
    {
        variant: 'Docs',
        title: 'Completed Tasks',
        subtitle: data.completedTasks,
        href: '/admin/resources/completed',
    },
    {
        variant: 'Plug',
        title: 'Active Users',
        subtitle: data.activeUsers,
        href: '/admin/resources/User?page=1&filters.isBlocked=false',
    }
];
const Card = styled(Box) `
  display: ${({ flex }) => (flex ? 'flex' : 'block')};
  color: ${({ theme }) => theme.colors.grey100};
  height: 100%;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.space.md};
  transition: all 0.1s ease-in;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary60};
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }

  & .dsc-icon svg, .gh-icon svg {
    width: 64px;
    height: 64px;
  }
`;
Card.defaultProps = {
    variant: 'container',
    boxShadow: 'card',
};
export const Dashboard = () => {
    const [data, setData] = useState({});
    const api = new ApiClient();
    useEffect(() => {
        api.getDashboard()
            .then((response) => {
            console.log('response', response.data);
            setData(response.data);
        })
            .catch((error) => {
            console.log('error', error);
        });
    }, []);
    return (React.createElement(Box, null,
        React.createElement(DashboardHeader, null),
        React.createElement(Box, { mt: ['xl', 'xl', '-100px'], mb: "xl", mx: [0, 0, 0, 'auto'], px: ['default', 'lg', 'xxl', '0'], position: "relative", flex: true, flexDirection: "row", flexWrap: "wrap", width: [1, 1, 1, 1024] }, boxes(data).map((box, index) => (React.createElement(Box, { key: index, width: [1, 1 / 2, 1 / 2, 1 / 3], p: "lg" },
            React.createElement(Card, { as: "a", href: box.href },
                React.createElement(Text, { textAlign: "center" },
                    React.createElement(Illustration, { variant: box.variant, width: 100, height: 70 }),
                    React.createElement(H5, { mt: "md" }, box.title),
                    React.createElement(Text, null, box.subtitle)))))))));
};
export default Dashboard;
