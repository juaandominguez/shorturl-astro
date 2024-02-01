import React from 'react';
import useStore from '../store/urlStore';
import type { CustomUrl } from '../lib/types';
import urlDeleteFetch from '../utils/urlDeleteFetch';
import toast, { Toaster } from 'react-hot-toast';
import TableRow from './table/TableRow';
interface TableProps {
}

const notifyError = () => toast.error('Error deleting url');

const Table: React.FC<TableProps> = () => {
  const deleteUrl = useStore((state: any) => state.deleteUrl);
  const rowStyle = 'ml-10 w-[50%] max-w-[50%] line-clamp-1 text-justify'
  const urls: CustomUrl[] = useStore((state: any) => state.urls);
  const onClick = async (url: CustomUrl, isLoading: boolean, setIsLoading: (isLoading: boolean) => void) => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      await urlDeleteFetch(url.shortUrl);
      deleteUrl(url);
      setIsLoading(false);
    }
    catch (err) {
      notifyError();
      setIsLoading(false);
    }
  }
  return (
    <>
      <table className="default-style flex flex-col mt-8">
        <thead className='pt-8 border-b-[#2a2e36] border-b-2'>
          <tr className={`flex flex-row justify-around pb-6 ${urls.length > 0 ? "w-[90%]" : "w-[100%]"}`}>
            <th className={`font-semibold ${urls.length > 0 && rowStyle}`}>Original Url</th>
            <th className={`font-semibold ${urls.length > 0 && rowStyle}`}>Shortened Url</th>
          </tr>
        </thead>
        <tbody className='pb-6'>
          {
            urls.length > 0 ? (
              urls.map((url, i: number) => {
                if (i === urls.length - 1) {
                  return (
                    <TableRow isLast={true} rowStyle={rowStyle} url={url} onClick={onClick} key={url.shortUrl} />
                  )
                }
                else return (
                  <TableRow isLast={false} rowStyle={rowStyle} url={url} onClick={onClick} key={url.shortUrl} />

                )
              }
              )
            ) : (
              <tr className='flex flex-row justify-around pt-6 border-b-[#2a2e36]'>
                <td>No urls to show</td>
              </tr>
            )
          }
        </tbody>
      </table>
      <Toaster toastOptions={
        {
          style: {
            background: '#23262d',
            color: '#fff',
          },
        }
      } />
    </>
  );
}

export default Table;