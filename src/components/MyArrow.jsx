import { MoveUpRight } from "lucide-react";

function MyArrow({size = 1}) {
  return (
    <div style={{scale:size}} className="circ mr-1 z-[98] h-[90%] -right-[1px] bg-white flex justify-center items-center aspect-square rounded-full absolute">
      <MoveUpRight />
    </div>
  );
}

export default MyArrow;
