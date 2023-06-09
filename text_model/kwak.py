from PyKomoran import *
import fasttext
from konlpy.tag import Okt

def a(userMemo):

    input_morph = w2v(userMemo)
    model = fasttext.train_supervised(input='./merged_memo_data',
                                  epoch=100,
                                  bucket=20000,
                                  lr=1,
                                  wordNgrams=2,
                                  dim=80,)

    model.save_model('./practice.bin')
    print('Trained Completed !!')

    answer = []
    for i in model.predict(input_morph,k=3)
    return answer


def w2v(userMemo):

    okt = Okt()
    MemoMorph= okt.morphs(userMemo)

    return " ".join(MemoMorph[i] for i in range(len(MemoMorph)))
