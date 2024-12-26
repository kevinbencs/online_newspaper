import Image from 'next/image';
import { registry } from '@/actions/twofa';
import TwoFA from '@/app/_components/about/twofa';
import DeleteTwofa from '@/app/_components/about/deleteTwofa';
import DownloadDeleteCode from '@/app/_components/about/deleteCode';

const Page = async () => {

    const { have, error, qr, code } = await registry()

    if (error) return (
        <div className='text-2xl'>{error}</div>
    )

    if (have) return (
        <div>
            <div className='mb-8'>You have already set up 2FA. Would you like to turn off? (If you turn off, you have to scan the QR-code again.)</div>
            <DeleteTwofa />
        </div>
    )


    return (
        <div>
            <div className='mb-4'>
                1. Download a 2fa application
            </div>
            <section className='mb-4 pl-2'>
                <h3>Android</h3>
                <ul>
                    <li className='pl-2'><a href="https://play.google.com/store/apps/details?id=com.authenticator.authservice2" target='_blank'> TOTP Authenticator - 2FA Cloud</a></li>
                    <li className='pl-2'><a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" target='_blank'> Google Authenticator</a></li>
                </ul>

            </section>
            <section className='mb-8 pl-2'>
                <h3>IOS</h3>
                <ul>
                    <li className='pl-2'><a href="https://apps.apple.com/us/app/totp-authenticator-fast-2fa/id1404230533" target='_blank'> TOTP Authenticator - 2FA Cloud</a></li>
                    <li className='pl-2'><a href="https://apps.apple.com/hu/app/google-authenticator/id388497605" target='_blank'> Google Authenticator</a></li>
                </ul>
            </section>
            <div className='mb-8'>
                2. Scan the QR-code or add the number
            </div>
            <div className='mb-8'>
                3. Add the 2FA code and save
            </div>
            {(qr && qr !== '') &&
                <Image src={qr} alt='qr-code' width={200} height={200} className='mb-10' />
            }
            <DownloadDeleteCode code={code}/>
            <TwoFA />
        </div>
    )
}

export default Page