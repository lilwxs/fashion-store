'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetUsersQuery } from '@/redux/services/userApi';
import { Button, ButtonGroup } from '@mui/material';

export default function Home() {
  const { isLoading, isFetching, data, error } = useGetUsersQuery(null);

  return (
    <main style={{ maxWidth: 1200, marginInline: 'auto', padding: 20 }}>
      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading...</p>
      ) : data ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: 20,
          }}
        >
          {data.map((user) => (
            <div key={user.id} style={{ border: '1px solid #ccc', textAlign: 'center' }}>
              <Image
                src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                width={180}
                height={180}
                priority={true}
                alt={user.name}
                style={{ height: 180, width: 180 }}
              />
              <h3>{user.name}</h3>
              <ButtonGroup
                variant='contained'
                size='small'
                aria-label='outlined primary button group'
              >
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
              </ButtonGroup>
            </div>
          ))}
        </div>
      ) : null}
    </main>
  );
}
