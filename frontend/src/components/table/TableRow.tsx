import React from 'react'
import type { CustomUrl } from '../../lib/types'
import Trash from '../../icons/Trash'
import Loading from '../../icons/Loading'
interface TableRowProps {
    isLast: boolean
    rowStyle: string
    url: CustomUrl
    onClick: (url: CustomUrl, isLoading: boolean, setIsLoading: (isLoading: boolean) => void) => void
}

const TableRow: React.FC<TableRowProps> = ({ isLast, rowStyle, url, onClick }) => {
    const [isLoading, setIsLoading] = React.useState(false)
    return (
        <>
            {
                isLast ? (
                    <tr className='flex flex-row'>
                        <td className='flex flex-row justify-around pt-6 w-[90%]'>
                            <div className={rowStyle}><a target='_blank' href={url.shortUrl}>{url.shortUrl}</a></div>
                            <div className={rowStyle}><a target='_blank' href={url.originalUrl}>{url.originalUrl}</a></div>
                        </td>
                        <td className='md:w-10 md:h-10 md:mr-10 hidden md:block' onClick={() => onClick(url, isLoading, setIsLoading)} aria-disabled={isLoading}>{isLoading ? <Loading /> : <Trash />}</td>
                    </tr>
                ) : (
                    <tr className='flex flex-row border-b-[#2a2e36] border-b-2'>
                        <td className='flex flex-row justify-around py-6 w-[90%]'>
                            <div className={rowStyle}><a target='_blank' href={url.shortUrl}>{url.shortUrl}</a></div>
                            <div className={rowStyle}><a target='_blank' href={url.originalUrl}>{url.originalUrl}</a></div>
                        </td>
                        <td className='md:w-10 md:h-10 md:mr-10 hidden md:block' onClick={() => onClick(url, isLoading, setIsLoading)} aria-disabled={isLoading}>{
                            isLoading ? <Loading /> : <Trash />
                        }</td>
                    </tr>
                )}
        </>
    )
}

export default TableRow