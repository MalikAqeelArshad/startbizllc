import { ApiClient } from 'adminjs'
import React, { useEffect, useState } from 'react'
import { Box, H2, H5, Illustration, IllustrationProps, Text } from '@adminjs/design-system'
import { styled } from '@adminjs/design-system/styled-components'

import RocketSVG from '../utils/rocket-svg.js'

const pageHeaderHeight = 300
const pageHeaderPaddingY = 74
const pageHeaderPaddingX = 250

export const DashboardHeader: React.FC = () => {
  return (
    <Box data-css="default-dashboard">
      <Box
        position="relative"
        overflow="hidden"
        bg="white"
        height={pageHeaderHeight}
        py={pageHeaderPaddingY}
        px={['default', 'lg', pageHeaderPaddingX]}
      >
        <Box position="absolute" top={30} left={0} opacity={0.9} animate display={['none', 'none', 'none', 'block']}>
          <RocketSVG />
        </Box>
        <Text textAlign="center" color="grey100">
          <H2 fontWeight="bold">Welcome to Startbiz</H2>
          <Text opacity={0.8}>Your Digital Dreams, Our Web Mastery !</Text>
        </Text>
      </Box>
    </Box>
  )
}

type BoxType = {
  variant: string
  title: string
  subtitle: string
  href: string
}

const boxes = (data): Array<BoxType> => [
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
]

const Card = styled(Box)`
  display: ${({ flex }): string => (flex ? 'flex' : 'block')};
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
`

Card.defaultProps = {
  variant: 'container',
  boxShadow: 'card',
}

export const Dashboard: React.FC = () => {
  const [data, setData]: any = useState({})
  const api = new ApiClient()
  
  useEffect(() => {
    api.getDashboard()
      .then((response) => {
        console.log('response', response.data);
        setData(response.data)
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, [])

  return (
    <Box>
      <DashboardHeader />
      <Box
        mt={['xl', 'xl', '-100px']}
        mb="xl"
        mx={[0, 0, 0, 'auto']}
        px={['default', 'lg', 'xxl', '0']}
        position="relative"
        flex
        flexDirection="row"
        flexWrap="wrap"
        width={[1, 1, 1, 1024]}
      >
        {boxes(data).map((box, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={index} width={[1, 1 / 2, 1 / 2, 1 / 3]} p="lg">
            <Card as="a" href={box.href}>
              <Text textAlign="center">
                <Illustration
                  variant={box.variant as IllustrationProps['variant']}
                  width={100}
                  height={70}
                />
                <H5 mt="md">{box.title}</H5>
                <Text>{box.subtitle}</Text>
              </Text>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Dashboard