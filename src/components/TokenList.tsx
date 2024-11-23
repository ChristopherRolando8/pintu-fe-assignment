import React, { useState } from 'react';
import { useTokenContext } from '../context/TokenContext';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Typography,
  TableContainer,
  Paper,
  Tabs,
  Tab,
  Box,
  InputBase,
  IconButton,
  Select,
  MenuItem,
  useMediaQuery,
  SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { formatPrice } from '../utils/formatPrice';
import styles from '../styles/TokenList.module.css';
import {
  NewReleases,
  Savings,
  SportsEsports,
  AccountBalance,
  SwapHoriz,
  Layers,
  CastConnected,
  Cloud,
  Calculate,
  Gavel,
} from '@mui/icons-material';
import { getTokenChangeValue } from '@/utils/tokenUtils';
import Image from 'next/image';

const TokenList: React.FC = () => {
  const { tokens, isLoading, error } = useTokenContext();
  const [selectedTab, setSelectedTab] = useState(0);
  const [timeFrame, setTimeFrame] = useState('24H');
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleTimeFrameChange = (event: SelectChangeEvent) => {
    setTimeFrame(event.target.value as string);
  };

  if (isLoading) return <Typography variant="h6">Loading...</Typography>;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  return (
    <Container className={styles.tokenContainer}>
      <Box className={styles.headerContainer}>
        <Typography variant="h4" className={styles.headerTitle}>
          Harga Crypto Hari Ini
        </Typography>
        <Box className={styles.searchContainer}>
          <InputBase
            placeholder="Cari aset di Pintu"
            inputProps={{ 'aria-label': 'search' }}
            className={styles.searchInput}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      <Box className={styles.tabsContainer}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="crypto categories"
          TabIndicatorProps={{ style: { display: 'none' } }}
          sx={{
            '& .MuiTab-root': {
              '&:hover': {
                backgroundColor: '#E0E7FF',
              },
              '&.Mui-selected': {
                backgroundColor: '#E0E7FF',
                color: '#007AFF',
                fontWeight: 'bold',
              },
            },
          }}
        >
          <Tab icon={<NewReleases />} label="New" className={styles.tabItem} />
          <Tab icon={<Savings />} label="DeFi" className={styles.tabItem} />
          <Tab icon={<SportsEsports />} label="NFT/Gaming" className={styles.tabItem} />
          <Tab icon={<AccountBalance />} label="CEX" className={styles.tabItem} />
          <Tab icon={<SwapHoriz />} label="DEX" className={styles.tabItem} />
          <Tab icon={<Layers />} label="Layer-1" className={styles.tabItem} />
          <Tab icon={<CastConnected />} label="Layer-2" className={styles.tabItem} />
          <Tab icon={<Cloud />} label="DePIN" className={styles.tabItem} />
          <Tab icon={<Savings />} label="Lending" className={styles.tabItem} />
          <Tab icon={<Calculate />} label="AI & Big Data" className={styles.tabItem} />
          <Tab icon={<Gavel />} label="Stablecoin" className={styles.tabItem} />
        </Tabs>
      </Box>
      {isMobile && (
        <Box className={styles.timeFrameContainer}>
          <Select
            value={timeFrame}
            onChange={handleTimeFrameChange}
            displayEmpty
            className={styles.timeFrameSelect}
          >
            <MenuItem value="24H">24H</MenuItem>
            <MenuItem value="1W">1W</MenuItem>
            <MenuItem value="1M">1M</MenuItem>
            <MenuItem value="1Y">1Y</MenuItem>
          </Select>
        </Box>
      )}
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={styles.tableHeaderCell}>Crypto</TableCell>
              <TableCell className={styles.tableHeaderCell}>{!isMobile ? 'Price' : ''}</TableCell>
              {!isMobile && (
                <>
                  <TableCell className={styles.tableHeaderCell}>24H</TableCell>
                  <TableCell className={styles.tableHeaderCell}>1W</TableCell>
                  <TableCell className={styles.tableHeaderCell}>1M</TableCell>
                  <TableCell className={styles.tableHeaderCell}>1Y</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {tokens.map((token) => (
              <TableRow key={token.id} hover>
                <TableCell>
                  <div className={styles.tokenInfo}>
                    <Image src={token.logoUrl || ''} alt={`${token.name} logo`} width={40} height={40} />
                    <div>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {token.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#7D7D7D' }}>
                        {token.id}
                      </Typography>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} alignItems="center" gap={1}>
                    <Typography variant="subtitle1">
                      {formatPrice(Number(token.price))}
                    </Typography>
                    {isMobile && (
                      <Typography
                        variant="subtitle1"
                        className={parseFloat(getTokenChangeValue(token, timeFrame)) >= 0 ? styles.positive : styles.negative}
                      >
                        {getTokenChangeValue(token, timeFrame)}%
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                {!isMobile && (
                  <>
                    <TableCell className={parseFloat(token.change24h) >= 0 ? styles.positive : styles.negative}>
                      {token.change24h}%
                    </TableCell>
                    <TableCell className={parseFloat(token.changeWeek) >= 0 ? styles.positive : styles.negative}>
                      {token.changeWeek}%
                    </TableCell>
                    <TableCell className={parseFloat(token.changeMonth) >= 0 ? styles.positive : styles.negative}>
                      {token.changeMonth}%
                    </TableCell>
                    <TableCell className={parseFloat(token.changeYear) >= 0 ? styles.positive : styles.negative}>
                      {token.changeYear}%
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TokenList;
