import React, { useEffect, useState } from "react";
import MuIModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtoms";
import {
  PlusIcon,
  XIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from "@heroicons/react/outline";
import { Element, Genre } from "../typings";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";
type ModalProps = {};

const Modal: React.FC<ModalProps> = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err.message));

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <MuIModal
      className="fixed !top-7 left-0 right-0  z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
      open={showModal}
      onClose={handleClose}
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6 " />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-1 md:px-8 text-base md:text-xl font-semibold md:font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-5 w-5 md:h-7 md:w-7 text-black" />
                Play
              </button>
              <button className="modalButton">
                <PlusIcon className="h-5 w5 md:h-7 md:w-7" />
              </button>
              <button className="modalButton">
                <ThumbUpIcon className="h-5 w5 md:h-7 md:w-7" />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="w-5 h-5" />
              ) : (
                <VolumeUpIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg ">
            <div className="flex items-center text-sm space-x-2">
              <p className="font-semibold text-green-400">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/400 px-1.5 text-xs">
                Hd
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="md:w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm ">
                <div>
                  <span className="text-[gray]">Genres:</span>
                  {genres.map((genre) => genre.name).join(",")}
                </div>
                <div>
                  <span className="text-[gray]">Original Language: </span>
                  {movie?.original_language}
                </div>
                <div>
                  <span className="text-[gray]">Total Vores: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuIModal>
  );
};
export default Modal;
