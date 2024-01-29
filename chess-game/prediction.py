
from flask import Flask, request, jsonify
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)

#4-01-26T20:44:50.764490Z","iopub.execute_input":"2024-01-26T20:44:50.764987Z","iopub.status.idle":"2024-01-26T20:45:02.374046Z","shell.execute_reply.started":"2024-01-26T20:44:50.764954Z","shell.execute_reply":"2024-01-26T20:45:02.372894Z"}}


# %% [code] {"execution":{"iopub.status.busy":"2024-01-26T20:45:02.375499Z","iopub.execute_input":"2024-01-26T20:45:02.375819Z","iopub.status.idle":"2024-01-26T20:45:02.382170Z","shell.execute_reply.started":"2024-01-26T20:45:02.375789Z","shell.execute_reply":"2024-01-26T20:45:02.381146Z"}}
import gc
from torch.utils.data import Dataset, DataLoader
import torch.nn as nn
import torch.nn.functional as F
import torch
import chess

class module(nn.Module):

    def __init__(self, hidden_size):
        super(module, self).__init__()
        self.conv1 = nn.Conv2d(hidden_size, hidden_size, 3, stride=1, padding=1)
        self.conv2 = nn.Conv2d(hidden_size, hidden_size, 3, stride=1, padding=1)
        self.bn1 = nn.BatchNorm2d(hidden_size)
        self.bn2 = nn.BatchNorm2d(hidden_size)
        self.activation1 = nn.SELU()
        self.activation2 = nn.SELU()

    def forward(self, x):
        x_input = torch.clone(x)
        x = self.conv1(x)
        x = self.bn1(x)
        x = self.activation1(x)
        x = self.conv2(x)
        x = self.bn2(x)
        x += x_input
        x = self.activation2(x)
        return x
class ChessNet(nn.Module):

    def __init__(self, hidden_layers=4, hidden_size=200):
        super(ChessNet, self).__init__()
        self.hidden_layers = hidden_layers
        self.input_layer = nn.Conv2d(6, hidden_size, 3, stride=1, padding=1)
        self.module_list = nn.ModuleList([module(hidden_size) for i in range(hidden_layers)])
        self.output_layer = nn.Conv2d(hidden_size, 2, 3, stride=1, padding=1)

    def forward(self, x):

        x = self.input_layer(x)
        x = F.relu(x)

        for i in range(self.hidden_layers):
            x = self.module_list[i](x)

        x = self.output_layer(x)

        return x

def return_mat(board):
    notation_mapping = {   #standard to sidhu notation
        'r': 'b-rook',
        'n': 'b-knight',
        'b': 'b-bishop',
        'q': 'b-queen',
        'k': 'b-king',
        'p': 'b-pawn',
        'R': 'w-rook',
        'N': 'w-knight',
        'B': 'w-bishop',
        'Q': 'w-queen',
        'K': 'w-king',
        'P': 'w-pawn',
        '.': None
    }
    board_str = str(board)
    # Replace the standard notation with custom notation
    new_board_chars = []
    for char in board_str:
        if char in notation_mapping:
            new_board_chars.append(str(notation_mapping[char]))
        else:
            new_board_chars.append(char)

    # Join the modified characters to form the new board string
    new_board_str = ' '.join(new_board_chars)

    # Print the modified board string
    return new_board_str

def input_board(board_str):
    # Convert the board string to a 2D list
    board = [row.split() for row in board_str.split('\n')]

    reverse_notation_mapping = {
        'b-rook': 'r',
        'b-knight': 'n',
        'b-bishop': 'b',
        'b-queen': 'q',
        'b-king': 'k',
        'b-pawn': 'p',
        'w-rook': 'R',
        'w-knight': 'N',
        'w-bishop': 'B',
        'w-queen': 'Q',
        'w-king': 'K',
        'w-pawn': 'P',
        'None': '.'
    }

    # Convert custom notation to standard notation
    for i in range(8):
        for j in range(8):
            board[i][j] = reverse_notation_mapping[board[i][j]]

    # Convert the 2D list to a FEN string
    fen = ''
    for row in board:  # 8th row to 1st row
        empty_count = 0
        for square in row:  # 'a' to 'h'
            if square == '.':  # Empty square
                empty_count += 1
            else:  # Square is occupied by a piece
                if empty_count > 0:
                    fen += str(empty_count)
                    empty_count = 0
                fen += square
        if empty_count > 0:
            fen += str(empty_count)
        fen += '/'
    fen = fen[:-1]  # Remove the trailing '/'

    # Create a chess.Board object
    board = chess.Board(fen)
    return board

def checkmate_single(board):
    board = board.copy()
    legal_moves = list(board.legal_moves)
    for move in legal_moves:
        board.push_uci(str(move))
        if board.is_checkmate():
            move = board.pop()
            return move
        _ = board.pop()
    return None

# %% [code] {"execution":{"iopub.status.busy":"2024-01-26T20:45:02.592224Z","iopub.status.idle":"2024-01-26T20:45:02.592727Z","shell.execute_reply.started":"2024-01-26T20:45:02.592488Z","shell.execute_reply":"2024-01-26T20:45:02.592511Z"}}
def distribution_over_moves(vals):
    probs = np.array(vals)
    probs = np.exp(probs)
    probs = probs / probs.sum()
    probs = probs ** 3
    probs = probs / probs.sum()
    return probs

# %% [code] {"execution":{"iopub.status.busy":"2024-01-26T20:45:02.594041Z","iopub.status.idle":"2024-01-26T20:45:02.594945Z","shell.execute_reply.started":"2024-01-26T20:45:02.594715Z","shell.execute_reply":"2024-01-26T20:45:02.594739Z"}}
def predict(x):
    model.eval()
    with torch.no_grad():
        outputs = model(x)
        return outputs.cpu().numpy()        
    
def choose_move(board,color):
    board = input_board(board)

    legal_moves = list(board.legal_moves)

    move = checkmate_single(board)   #checking if single move me possible hai check mate

    if move is not None:   #if yes..kardo
        return move

    x = torch.Tensor(board_2_rep(board)).float().to('cuda')
    if color == chess.BLACK:
        x *= -1
    x = x.unsqueeze(0)
    move = predict(x)
    # print(move)
    vals = []
    froms = [str(legal_move)[:2] for legal_move in legal_moves]
    froms = list(set(froms))
    for from_ in froms:
        # print(move[0,:,:][0][0])
        val = move[0,:,:][0][8-int(from_[1]), letter_2_num[from_[0]]]
        # print(from_)
        vals.append(val)

    probs = distribution_over_moves(vals)

    chosen_from = str(np.random.choice(froms, size=1, p=probs)[0])[:2]

    vals = []
    for legal_move in legal_moves:
        from_ = str(legal_move)[:2]
        if from_ == chosen_from:
            to = str(legal_move)[2:]
            # print(move[0,:,:][0])
            # print(move[0,:,:][1])
            val = move[0,:,:][1][8 - int(to[1]), letter_2_num[to[0]]]
            vals.append(val)
        else:
            vals.append(0)
    chosen_move = legal_moves[np.argmax(vals)]
    # Create a new chess board
    board = chess.Board()

# Push a move to the board
    board.push_uci(chosen_move)
    b_mat = return_mat(board)
    return b_mat


from flask import Flask, request, jsonify

app = Flask(__name__)
# Load the pre-trained model
model = ChessNet(hidden_layers=4, hidden_size=200)
model.load_state_dict(torch.load('model1.pth'))
model.eval()
@app.route('/play', methods=['POST'])
def play():
    chessboard = request.json['chessboard']


    new_board = choose_move(chessboard, chess.BLACK)
    print(new_board)
    return jsonify({'new_board': new_board})

if __name__ == '_main_':
    app.run()

model = ChessNet(hidden_layers=4, hidden_size=200)
model.load_state_dict(torch.load('model1.pth'))
model.eval()