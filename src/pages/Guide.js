function Guide() {
    return (
        <>
            <div className="container mt-4">
                Important note: Piece movement customizations will not work unless castling and
                check/checkmate detection are both turned off!
                <br/>
                <br/>
                <p>
                    Piece movement patterns are made up of one or more triplets that contain three main 
                    values in each triplet: <br/>
                    - x; this determines the unit x value<br/>
                    - y; this determines the unit y value<br/>
                    - max units; this determines how many unit xs and unit ys the piece 
                    can go at most. <br/>
                    For example, for the triplet in the rook x: 0, y: 1, max units: 8, 
                    this triplet says that the rook can go in the positive y direction one at a time, 
                    cannot go into the x direction in that same move, and can do that up to 8 times in 
                    one move. So, it says the rook can move in the positive y direction. If it was instead
                    x: 0, y: 2, max units: 4, the rook could only move upwards in multiples of 2, and
                    could jump over every other piece. Essentially, each triplet is an option that the 
                    piece has when moving.
                </p>
                <br/>
                Have fun playing!
            </div>
        </>
    )
}

export default Guide