export default function ScissorsImage({ flipped = false }: { flipped?: boolean }) {
  return (
    <div className={`w-24 h-24 md:w-48 md:h-48 relative ${flipped ? "scale-x-[-1]" : ""}`}>
     <img src="../scissors.png" className="size-52" alt="rock" />
    </div>
  )
}
