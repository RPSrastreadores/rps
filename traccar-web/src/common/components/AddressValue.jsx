import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from '@mui/material';
import { useTranslation } from './LocalizationProvider';
import { useCatch } from '../../reactHelper';

const AddressValue = ({ latitude, longitude, originalAddress }) => {
  const t = useTranslation();

  const addressEnabled = useSelector((state) => state.session.server.geocoderEnabled);

  const [address, setAddress] = useState();

  const fetchAddress = useCatch(async () => {
    const query = new URLSearchParams({ latitude, longitude });
    const response = await fetch(`/api/server/geocode?${query.toString()}`);
    if (response.ok) {
      setAddress(await response.text());
    } else {
      throw Error(await response.text());
    }
  });

  useEffect(() => {
    if (originalAddress) {
      setAddress(originalAddress);
    } else if (addressEnabled && latitude && longitude) {
      // Buscar endereço automaticamente se não existir um endereço original
      fetchAddress();
    }
  }, [latitude, longitude, originalAddress, addressEnabled]);

  const showAddress = useCatch(async (event) => {
    event.preventDefault();
    await fetchAddress();
  });

  if (address) {
    return address;
  }
  if (addressEnabled) {
    return (<Link href="#" onClick={showAddress}>{t('sharedShowAddress')}</Link>);
  }
  return '';
};

export default AddressValue;
