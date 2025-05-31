import Image from 'next/image'
import React from 'react'

const ServerError = () => {
    return (
        <div className="w-full flex-center flex-col text-center">
            <h2 className="h3-bold text-primary-500">Briefly Unavailable due to Maintenance</h2>
            <Image
                src="/assets/images/server-maintenance.png"
                alt="Server Error"
                width={200}
                height={200}
            />
        </div>
    )
}

export default ServerError