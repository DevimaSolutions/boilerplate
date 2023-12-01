'use client';

import { useState } from 'react';

import { envUtil } from 'src/utils';

const env = envUtil.getEnv();

export function Example() {
  const [data, setData] = useState<string>('');
  const onGetProfile = async () => {
    setData('');
    const res = await fetch('/api/authorization/profile', { headers: { 'api-key': env.apiKey } });
    setData(JSON.stringify(await res.json()));
  };

  return (
    <>
      <button onClick={onGetProfile} type="button">
        Fetch profile
      </button>
      <div>
        <code>{data}</code>
      </div>
    </>
  );
}
