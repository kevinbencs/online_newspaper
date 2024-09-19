import Link from 'next/link';
import Stop from '../../image/stop.png';
import Image from 'next/image';

const Rightsidebar = () => {
    const data = [
        'label eafsese sf sye fgsegsegdsgsegs wsfwsf ',
        'label eafsese sf sye fgsegsegdsgsegs wsfwsf awdaw fawf awfawfsydfe',
        'label eafsese sf sye fgsegsegdsgsegs wsfwsf awdaw fawf awfawfsydfe',
        'label eafsese sf sye fgsegsegdsgsegs wsfwsf awdaw fawf awfawfsydfe',
        'label eafsese sf sye fgsegsegdsgsegs wsfwsf awdaw fawf awfawfsydfewdadawda wdawdawdawdawdawsqwsdwda awd aw daw dawíd'
    ];

    return (
        <div className='ml-2 lg:ml-0 mr-2 lg:mr-0 '>
            <Link href='https://x.com/' className='block text-center bg-black mb-24 text-white rounded hover:text-white dark:hover:text-white pt-5 pb-5'>
                <h3 className='text-3xl mb-3'>Word Times</h3>
                <p className='text-lg mb-3 flex items-center justify-center gap-1'><div>Follow us on </div>
                    <div className='flex items-center'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 25 25"
                            className='fill-white'>
                            <path
                                d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
                        </svg>!
                    </div>

                </p>
                <div className='bg-white text-black w-[90%] ml-[5%] rounded-sm text-lg pt-1 pb-1 font-semibold flex items-center justify-center gap-2'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25">
                        <path
                            d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
                    </svg>
                    Follow
                </div>
            </Link>

            <section className='max-w-[400px] ml-2 lg:ml-0'>
                <Link href='/latest' className='mb-2 flex items-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 fill-slate-400 text-slate-400" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                    <h3 className='text-3xl text-slate-400'>Latest</h3>
                </Link>
                <div>
                    {data.map(d =>
                        <>
                            <Link href='/' className='category top-3 uppercase text-[10px] '>dwdw</Link>
                            <Link href='/' className=' flex gap-2 items-start'>
                                <div className='overflow-hidden max-h-[73px] min-h-[73px] min-w-[130px] max-w-[130px]'>
                                    <Image src={Stop} alt='sefse' className='max-w-[130px] min-w-[130px]' />
                                </div>
                                <h4 className=' text-sm'>{d}</h4>
                            </Link>
                        </>
                    )}
                </div>
            </section>
            <Link href="/" className='border border-gray-500 dark:bg-neutral text-neutral-content hover:text-gray-400 bg-gray-600 rounded text-center p-2 mt-24 mb-24 block'>
                <h3 className='text-lg  '>Support</h3>
                <div className='text-xs mt-6 flex  justify-evenly'>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                        <path fill="#1565C0" d="M18.7,13.767l0.005,0.002C18.809,13.326,19.187,13,19.66,13h13.472c0.017,0,0.034-0.007,0.051-0.006C32.896,8.215,28.887,6,25.35,6H11.878c-0.474,0-0.852,0.335-0.955,0.777l-0.005-0.002L5.029,33.813l0.013,0.001c-0.014,0.064-0.039,0.125-0.039,0.194c0,0.553,0.447,0.991,1,0.991h8.071L18.7,13.767z"></path><path fill="#039BE5" d="M33.183,12.994c0.053,0.876-0.005,1.829-0.229,2.882c-1.281,5.995-5.912,9.115-11.635,9.115c0,0-3.47,0-4.313,0c-0.521,0-0.767,0.306-0.88,0.54l-1.74,8.049l-0.305,1.429h-0.006l-1.263,5.796l0.013,0.001c-0.014,0.064-0.039,0.125-0.039,0.194c0,0.553,0.447,1,1,1h7.333l0.013-0.01c0.472-0.007,0.847-0.344,0.945-0.788l0.018-0.015l1.812-8.416c0,0,0.126-0.803,0.97-0.803s4.178,0,4.178,0c5.723,0,10.401-3.106,11.683-9.102C42.18,16.106,37.358,13.019,33.183,12.994z"></path><path fill="#283593" d="M19.66,13c-0.474,0-0.852,0.326-0.955,0.769L18.7,13.767l-2.575,11.765c0.113-0.234,0.359-0.54,0.88-0.54c0.844,0,4.235,0,4.235,0c5.723,0,10.432-3.12,11.713-9.115c0.225-1.053,0.282-2.006,0.229-2.882C33.166,12.993,33.148,13,33.132,13H19.66z"></path>
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                        <rect width="6" height="32" x="8" y="8" fill="#f44336"></rect><circle cx="30" cy="20" r="12" fill="#f44336"></circle>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48" className='bg-black'>
                        <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path><path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path><path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                        <linearGradient id="Et0R~umK8VADpitl6wcz1a_pFNd0FTuBU2Q_gr1" x1="20.375" x2="28.748" y1="1365.061" y2="1394.946" gradientTransform="translate(0 -1354)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#00b3ee"></stop><stop offset="1" stop-color="#0082d8"></stop></linearGradient><path fill="url(#Et0R~umK8VADpitl6wcz1a_pFNd0FTuBU2Q_gr1)" d="M43.125,9H4.875C3.287,9,2,10.287,2,11.875v24.25C2,37.713,3.287,39,4.875,39h38.25	C44.713,39,46,37.713,46,36.125v-24.25C46,10.287,44.713,9,43.125,9z"></path><path d="M25.733,31c-1.376-0.014-2.847-0.291-3.752-0.708l-0.658-0.303l-0.178,0.83h-5.048l1.844-8.621	l-3.612,8.621H9.717l-2.59-10.013c-0.061-0.239-0.09-0.304-0.103-0.32c-0.006-0.006-0.034-0.024-0.119-0.071	c-0.574-0.312-1.607-0.652-2.698-0.89l-0.971-0.211l0.444-2.103h5.92c1.18,0,2.131,0.8,2.365,1.989l0.626,3.326l2.104-5.315h9.36	L23.674,19c1.055-1.245,2.845-2,5.037-2c1.072,0,2.073,0.183,3.151,0.576l0.818,0.299l-0.971,4.53l-1.135-0.521	c-0.82-0.378-1.555-0.457-2.026-0.457c-0.165,0-0.297,0.011-0.386,0.022c-0.065,0.008-0.123,0.019-0.173,0.031	c0.228,0.14,0.531,0.301,0.713,0.396c1.074,0.563,2.598,1.362,3.098,2.989l2.592-6.188c0.379-0.903,1.222-1.465,2.2-1.465h3.376	l2.842,13.607h-4.82l-0.363-1.733h-2.338l-0.627,1.733h-5.356l0.322-0.769C28.598,30.659,27.271,31,25.738,31H25.733z M23.366,25.935c0.704,0.33,1.367,0.641,2.543,0.641l0.104-0.001c0.312-0.005,0.594-0.077,0.738-0.147	c-0.117-0.094-0.373-0.265-0.924-0.533c-1.614-0.785-2.621-1.758-3.009-2.902l-0.522,2.444L23.366,25.935z" opacity=".05"></path><path d="M25.733,30.5c-1.306-0.013-2.696-0.272-3.543-0.662l-0.363-0.167l0.759-3.549l0.569,0.266	c0.717,0.336,1.467,0.688,2.754,0.688l0.109-0.001c0.521-0.008,1.3-0.186,1.306-0.642c0.002-0.188-0.152-0.44-1.277-0.988	c-0.727-0.354-2.937-1.432-2.908-3.615c0.019-2.548,2.311-4.329,5.572-4.329c1.013,0,1.96,0.174,2.98,0.546l0.409,0.149	l-0.749,3.495l-0.567-0.261c-0.903-0.416-1.714-0.503-2.235-0.503c-0.193,0-0.348,0.013-0.451,0.026	c-0.609,0.079-0.836,0.335-0.84,0.487c-0.005,0.238,0.672,0.594,1.216,0.88c1.267,0.664,3.001,1.575,2.992,3.711	c-0.012,2.673-2.313,4.469-5.728,4.469H25.733z M38.396,30.319l-0.363-1.733h-3.095l-0.627,1.733h-4.254l4.796-11.449	c0.3-0.715,0.967-1.158,1.739-1.158h2.97l2.633,12.607H38.396z M37.327,25.206l-0.424-2.033l-0.738,2.033H37.327z M16.716,30.319	l2.697-12.607h4.024l-2.696,12.607H16.716z M10.104,30.319l-2.492-9.638c-0.124-0.486-0.184-0.552-0.468-0.706	c-0.612-0.333-1.696-0.692-2.83-0.938l-0.485-0.105l0.258-1.22h5.515c0.934,0,1.688,0.637,1.875,1.586l0.945,5.021l2.614-6.607	h4.245l-5.284,12.607H10.104z" opacity=".07"></path><path fill="#fff" d="M23.638,21.836c-0.021,1.672,1.49,2.604,2.628,3.159c1.169,0.569,1.562,0.934,1.558,1.443	c-0.009,0.779-0.933,1.123-1.798,1.136c-1.509,0.023-2.386-0.407-3.083-0.733L22.4,29.384c0.7,0.322,1.995,0.604,3.339,0.616	c3.153,0,5.217-1.557,5.228-3.97c0.012-3.063-4.237-3.233-4.208-4.602c0.01-0.415,0.406-0.858,1.274-0.971	c0.43-0.057,1.616-0.1,2.96,0.519l0.528-2.46C30.798,18.252,29.868,18,28.711,18C25.743,18,23.655,19.578,23.638,21.836 M36.592,18.212c-0.576,0-1.061,0.336-1.278,0.851L30.81,29.819h3.151l0.627-1.733h3.851l0.364,1.733h2.777l-2.424-11.607H36.592 M37.033,21.348l0.909,4.359h-2.491L37.033,21.348 M19.818,18.212l-2.484,11.607h3.003l2.483-11.607H19.818 M15.375,18.212	l-3.126,7.9l-1.264-6.717c-0.148-0.75-0.734-1.183-1.385-1.183h-5.11L4.42,18.549c1.049,0.228,2.241,0.595,2.963,0.988	c0.442,0.24,0.568,0.45,0.713,1.02l2.395,9.263h3.174l4.865-11.607L15.375,18.212"></path>
                    </svg>
                </div>
            </Link>
            <section className='mb-24 max-w-[400px] ml-2 lg:ml-0'>
                <Link href='/important' className='flex items-center mb-2 gap-2'>

                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" className='size-6 fill-slate-400 text-slate-400 ' viewBox="0 0 24 24"><path stroke="currentColor" d="M12 19.5a2 2 0 1 1 0 4a2 2 0 0 1 0-4Zm2-3h-4v-.129A62 62 0 0 0 8.033.88L8 .75V.5h8v.25l-.033.129A62 62 0 0 0 14 16.37z" /></svg>
                    <h3 className=' text-3xl text-slate-400'>Important</h3>
                </Link>
                <div >
                    {data.map(d =>
                        <>
                            <Link href='/' className='category top-3 uppercase text-[10px] '>dwdw</Link>
                            <Link href='/' className='flex gap-2 items-start'>
                                <div className='overflow-hidden max-h-[73px] min-h-[73px] min-w-[130px] max-w-[130px]'>
                                    <Image src={Stop} alt='sefse' className='max-w-[130px] min-w-[130px]' />
                                </div>
                                <h4 className=' text-sm'>{d}</h4>
                            </Link>
                        </>
                    )}
                </div>
            </section>
            <Link href='https://www.facebook.com' className='mb-7 block text-center bg-sky-700 text-white rounded hover:text-white dark:hover:text-white pt-5 pb-5'>
                <h3 className='text-3xl mb-3'>Word Times</h3>
                <p className='text-lg mb-3'>Follow us on Facebook!</p>
                <div className='bg-white text-sky-700 w-[90%] ml-[5%] rounded-sm text-lg pt-1 pb-1 font-semibold flex items-center justify-center gap-1'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        className="fill-white bg-current rounded p-1">
                        <path
                            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                    </svg>
                    Follow
                </div>

            </Link>

        </div>
    )
}

export default Rightsidebar