'use client'

import React from 'react'

const Rules = () => {
    return (
        <div className='mb-12'>
            <div className='text-xl mb-2'>Rules</div>
            <ul>
                <li>Italic can be in Bold.</li>
                <li>Bold can be in Italic.</li>
                <li>Italic and Bold can be in Link and Anchor_lick.</li>
                <li>Italic, Bold, Link and Anchor_Link can be in List.</li>
                <li>Nothing can be in Image, Video, Audio, Facebook, Instagram, X, Linkedin, Pinterest, Tiktok, Youtube, Title, Highlight</li>
                <li>For LinkedIn: the url must be retrieved from the &quot;Embed this post&quot; option for the desired post</li>
            </ul>

            <div className='text-xl mb-1 mt-6'>E.g.</div>
            <ul>
                <li className='mb-5'>Link:
                    <div className='bg-[#2a323c] rounded-xl p-4 overflow-x-auto text-white'>
                        <pre><code>{`<Link url=(/example)></Link>`}</code></pre>
                    </div>
                    from
                    <div className='bg-[#2a323c] rounded-xl p-4 overflow-x-auto text-white'>
                        <pre><code>{`https://online-newspaper.com/example`}</code></pre>
                    </div>
                </li>
                <li className='mb-5'>Anchor_link:
                    <div className='bg-[#2a323c] rounded-xl p-4 overflow-x-auto text-white'>
                        <pre><code>{`<anchor_link url=(https://example.com/example)></anchor_link>`}</code></pre>
                    </div>
                    from
                    <div className='bg-[#2a323c] rounded-xl p-4 overflow-x-auto text-white'>
                        <pre><code>{`https://example.com/example`}</code></pre>
                    </div>
                </li>
                <li className='mb-5'>X:
                    <div className='bg-[#2a323c] rounded-xl p-4 overflow-x-auto text-white'>
                        <pre><code>{`<X id=(1231629319526547456)/>`}</code></pre>
                    </div>
                    from
                    <div className='bg-[#2a323c] rounded-xl p-4 overflow-x-auto text-white'>
                        <pre><code>{`https://x.com/SzirmaiGergely/status/1231629319526547456`}</code></pre>
                    </div>
                </li>
                <li>LinkedIn:
                    <div className='bg-[#2a323c] rounded-xl p-4 overflow-x-auto text-white'>
                        <pre><code>{`<linkedin url=(https://www.linkedin.com/embed/feed/update/urn:li:share:6892528764350185473)/>`}</code></pre>
                    </div>
                    from
                    <div className='bg-[#2a323c] rounded-xl p-4 overflow-x-auto text-white'>
                        <pre ><code> {`<iframe src=`}&quot;{`https://www.linkedin.com/embed/feed/update/urn:li:share:6892528764350185473`}&quot;{` height=`}&quot;{`592`}&quot;{` width=`}&quot;{`504`}&quot;{` frameborder=`}&quot;{`0`}&quot;{` allowfullscreen=`}&quot;&quot;{` title=`}&quot;{`Embedded post`}&quot;{`></iframe>`}</code></pre>
                        
                    </div>
                </li>
            </ul>

        </div>

    )
}

export default Rules