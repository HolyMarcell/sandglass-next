'use client'
import { Button } from '~/components/ui/button';

export default function PingBtn() {
  const handlePing = () => {
    fetch('/api/ping', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 42424242424242424',
        'x-fuck-you': 'PENIS'
      },
    });
  }

  return (
    <Button onClick={handlePing}>
      Ping
    </Button>
  )
}
