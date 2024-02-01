import ActionButton from "./ActionButton.tsx";
import * as z from 'zod';
import { useState } from 'react';
import urlFetch from '../utils/urlFetch.ts';
import useStore from "../store/urlStore.ts";

const schema = z.object({
  url: z.string().url(),
  name: z.string().refine(value => value.length <= 10, {
    message: "Name cannot have more than 10 characters",
    path: ['name']
  })
});
const InputCard = () => {
  const addUrl = useStore((state: any) => state.addUrl);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [showUrlError, setShowUrlError] = useState(false);
  const [showNameError, setShowNameError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorUrl, setAnchorUrl] = useState({
    show: false,
    url: ''
  });
  const onSubmit = async (event: any) => {
    event.preventDefault();
    const data = {
      url,
      name,
    };
    try {
      schema.parse(data);
      setShowUrlError(false);
      setShowNameError(false);
      setShowError(false);
      setIsLoading(true);
      const res = await urlFetch({ originalUrl: url, id: name })
      if (!res) throw new Error("Error fetching url");
      setAnchorUrl({
        show: true,
        url: res
      });
      addUrl({ originalUrl: url, shortUrl: res });
    }
    catch (err) {
      if (err instanceof z.ZodError) {
        if (err.errors.length === 2) {
          setShowUrlError(true);
          setShowNameError(true);
        }
        else if (err.errors[0].path[0] === "url") {
          setShowUrlError(true);
          setShowNameError(false);
        }
        else {
          setShowUrlError(false);
          setShowNameError(true);
        }
      }
      else {
        setShowError(true);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <h2 className="mt-[4vh] text-[1.6rem] text-center">Create your shortened link</h2>
      <form onSubmit={onSubmit}
        className="default-style flex flex-col mt-[4vh] w-[100%] justify-center items-center pb-[25px]"
      >
        <div className="flex flex-col items-center w-[100%] m-[5px] mt-[10px]">
          <label htmlFor="url">URL</label>
          <input type="text" id="url" placeholder="Enter your url here" value={url} onChange={(e) => setUrl(e.target.value)} />
          <label htmlFor="url" className={`text-red-500 text-sm mt-2 font-semibold ${showUrlError ? "block" : "hidden"}`}>Invalid url</label>
        </div>
        <div className="flex flex-col items-center w-[100%] m-[5px] mt-[10px]">
          <label htmlFor="name">Alias (Optional)</label>
          <input
            type="text"
            id="name"
            placeholder="Enter the preferred alias here"
            value={name} onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="url" className={`text-red-500 text-sm mt-2 font-semibold ${showNameError ? "block" : "hidden"}`}>Alias cannot have more than 10 letters</label>
        </div>
        <ActionButton isLoading={isLoading} />
        {showError && <p className="text-red-500 mt-2 pb-6 text-center text-[1.3rem] font-semibold">Error creating url</p>}
        <a target='_blank' className={`mt-2 pb-6 text-center text-[1.3rem] white ${anchorUrl.show ? "block" : "hidden"}`} href={anchorUrl.url}>{anchorUrl.url}</a>
      </form>
    </section>)
}

export default InputCard;
