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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'left', color: '#000' }}>
          Harga Crypto Hari Ini
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#F3F4F6',
            borderRadius: '20px',
            padding: '4px 16px',
            width: '300px',
          }}
        >
          <InputBase
            placeholder="Cari aset di Pintu"
            inputProps={{ 'aria-label': 'search' }}
            sx={{ ml: 1, flex: 1 }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="crypto categories"
          TabIndicatorProps={{ style: { display: 'none' } }}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              minHeight: '48px',
              minWidth: '100px',
              borderRadius: '20px',
              margin: '5px',
              backgroundColor: '#F0F4FF',
              color: '#007AFF',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              gap: '8px',
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
          <Tab icon={<NewReleases />} label="New" />
          <Tab icon={<Savings />} label="DeFi" />
          <Tab icon={<SportsEsports />} label="NFT/Gaming" />
          <Tab icon={<AccountBalance />} label="CEX" />
          <Tab icon={<SwapHoriz />} label="DEX" />
          <Tab icon={<Layers />} label="Layer-1" />
          <Tab icon={<CastConnected />} label="Layer-2" />
          <Tab icon={<Cloud />} label="DePIN" />
          <Tab icon={<Savings />} label="Lending" />
          <Tab icon={<Calculate />} label="AI & Big Data" />
          <Tab icon={<Gavel />} label="Stablecoin" />
        </Tabs>
      </Box>
      {isMobile && (
        <Box sx={{ marginBottom: '20px', textAlign: 'right' }}>
          <Select
            value={timeFrame}
            onChange={handleTimeFrameChange}
            displayEmpty
            sx={{ backgroundColor: '#F0F4FF', borderRadius: '20px', padding: '4px 16px' }}
          >
            <MenuItem value="24H">24H</MenuItem>
            <MenuItem value="1W">1W</MenuItem>
            <MenuItem value="1M">1M</MenuItem>
            <MenuItem value="1Y">1Y</MenuItem>
          </Select>
        </Box>
      )}
      <TableContainer component={Paper} sx={{ borderRadius: '20px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#7D7D7D' }}>Crypto</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#7D7D7D' }}>{!isMobile ? 'Price' : ''}</TableCell>
              {!isMobile && (
                <>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#7D7D7D' }}>24H</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#7D7D7D' }}>1W</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#7D7D7D' }}>1M</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#7D7D7D' }}>1Y</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {tokens.map((token) => (
              <TableRow key={token.id} hover>
                <TableCell>
                  <div className={styles.tokenInfo}>
                    <Image src={token.logoUrl || ''} alt={`${token.name} logo`} className={styles.tokenLogo} width={40} height={40} />
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
