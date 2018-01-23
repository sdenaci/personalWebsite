---
title: How I stopped worrying and realized that Gertrude Stein is kinda a robot Henry James, and made a markov model to prove it
date: "2017-11-07"
tag: "literature, coding, python"
---

I was reading Henry James' *Portrait of a Lady* in a delightful seminar taught by the delightful Wayne Koestenbaum about Henry James and his semi-dedicated disciple, Gertrude Stein. To my happily deranged mind, many of the sentences from *Portrait of a Lady* seemed to be written by Stein. This is pretty weird because *Portrait* definitely came first. What follows is a selection of these sentences it seems like Stein wrote, but that in actuality James did (my favorite ones are in bold, for the dedicated skimmers among you):

<p style="font-family: 'courier'">
An innocent pastime. What I should call. His American physiognomy. <b>You can’t see ideas - especially such ethereal ideas such as mine.</b> If I could only see it myself - that would be a great step in advance. An eye that denoted quick perception. It’s just like an novel. The alertness with which she evidently caused impressions. Her impressions were numerous. The elation of liberty and the pain of exclusion. She had spent much ingenuity in training it to a military step, and teaching it to advance, to halt, to retreat, to perform even more complicated maneuvers, at the word of command. ’Not when I have visitors,’ said Isabel, getting up to receive the intruder. But the emotion was of a kind which led her to say. Isabel is written in a foreign tongue. I can’t make her out. <b>She didn’t know she was bored, but when I told her, she seemed very grateful for the hint.</b> Isabel will enjoy puzzling a lord. I never know what I mean by my telegrams. <b>Clearness is too expensive.</b> I always know why. They are not nice to them in novels. A specimen. A specimen of what. Blurred and desultory gleams. It came from a certain fear. She won’t reproduce me, as the other one did.<b>The expression of a button is not normally deemed human.</b> If they were not the best in the world, they were the worst. She herself was a character. <b>I delight in a moat. The reader has a right to demand a description less metaphysical. Caspar Goodwood, Ralph continued, it’s rather a striking name.</b> They should discover or invent lovers for each other. Find out where Doctor Johnson had lived, and Goldsmith and Addison. A feeling of freedom. I think one name is as good as another. Accept her decisions submissively.  Mere spectatorship at the game of life. <b>I should kill the goose that supplies me with golden eggs.</b> I am afraid there are moments in life when even Beethoven has nothing to say to us. I was born under the shadow of the national banner. I came into the world in the Brooklyn navy-yard. I hope I shall live long enough to see what she does with herself. This brilliant fugitive from Brooklyn. A cluster of appurtenances. <b>She was as honest as a pair of compasses.</b> It was the mask of a house; it was not its face. She was evidently impregnated with the idea of submission. When people are not idiots. Used to them, I mean, so as to despise them. Its prison-like quality became a merit. A kind of finish which was not entirely artless. He was a specimen apart. Incommoded, she heard herself saying that, and thought it a ridiculous word. But it was the word that came to her. <b>In a kind of snail-train they call the express. These Italian trains go at about the rate of an American funeral.</b> I am selfish as iron.A man in love, you know, doesn’t ask advice. His wife can scarcely be termed a member of her family. Smiling as if an angel had kissed her.  They always paid, in public, a certain formal tribute to the commonplace. She even wondered whether his sense of humor were by chance defective. She was afraid her washerwoman wouldn’t care for her. Even Gilbert Osmond’s rich devices had not been able to correct a look of rather grand nudity. Their relative position, their absorbed mutual gaze, struck her as something detected. But it was all over by the time she had fairly seen it. He has about the extent of one’s pocket handkerchief. As the intimation that had gleamed. An uneradicated predilection for her society. She had too many ideas, and that she must get rid of them. His egotism lay hidden like a serpent in a bank of flowers. He was fond of the old, the consecrated, and transmitted; so was she, but she pretended to do what she chose with it. <b>Her sentiments were worth of a radical newspaper or of a Unitarian preacher. She had no traditions, and the moral horizons of a Unitarian minister. Who had never been able to understand Unitarianism.</b> They were strangely married, at all events, and it was an awful life. Isabel read all this as she would have read the hour on the clock-face. Grouped unconsciously and familiarly. It was like having a large balance at the bank. Always closely buttoned and compactly braided. <b>Oh, he was intrinsic enough.</b> Look as if she kept all the back numbers and would bring them out some day against me. <b>It was true that he took his recreation a little stiffly.</b> Mr. Goodwood speaks a good deal, but he doesn’t talk. He spoke a good deal in Rome, but he talks, perhaps, as little as ever. Oh yes, we are intimate enemies. He had never doubted for a moment that she was an excellent fellow. <b>We are as united, you know, as the candlestick and the snuffers.</b> Afflicted with a redundancy of leisure. She was too fond of early news. And yet I don’t touch you. Oh the imagination of women. It’s always vulgar, at bottom. If she lied she lied well. Her appearance in the flesh was a sort of reduplication. In the solemnity of sequestration there was something that overwhelmed her. I shall go to America. At last about to grapple in earnest with England. <b>You were ground in the very mill of the conventional. The bottomless idiocy of the world.</b>
</p>


The assertion that they "seem similar" is a weird thing to try to even begin to prove. I thought maybe if I could make something which, given some Henry James text, outputs some text from it and using only it, that could believably be a Gertrude Stein passage.
At the time, I was learning python through the <a href="https://developers.google.com/edu/python/introduction" style="color: blue">Google Python Introduction Course</a> and one of the assignments was to write a Markov Model which, given a text, for every word in it, provides a list of all the words that come after it, as well as their respective frequencies. Using this, the computer spits out a randomized kind of chopped and screwed version of the text, which resembles human text, but also very much dis-resembles (dissembles) it. Here's the code I wrote:

```python
import random
import sys
import collections
import argparse

PLACEHOLDER = ''

def mimic_dict(filename):
  """Returns mimic dict mapping each word to list of words which follow it."""
  mimic_dict = collections.defaultdict(list)
  with open(filename,'r') as f:
    text = f.read()
  words = text.split()

  prior_word = PLACEHOLDER
  for new_word in words + [PLACEHOLDER]:
    mimic_dict[prior_word].append(new_word)
    prior_word = new_word
  return mimic_dict


def print_mimic(mimic_dict, word):
  for i in range(200):
    sys.stdout.write(word+' ')
    next_word = mimic_dict[word]
    word = random.choice(next_word)



# Provided main(), calls mimic_dict() and mimic()
def main():
  if len(sys.argv) != 2:
    print 'usage: ./mimic.py file-to-read'
    sys.exit(1)

  dict = mimic_dict(sys.argv[1])
  print_mimic(dict, '')


if __name__ == '__main__':
  main()
```
Now a version of that treatment on Tender Buttons, a short book of what I am pretty sure is poetry by Stein.

<p style="font-family: 'courier'">
OBJECTS A BOX. Out of this makes the sound but turned is so much more, more easily ordinarily. Pick a quiet color. Then came back. Two bore, bore what, a need that nearly choice. The band if it means service, the section and four choices and yet all the stem and different sizes that there certainly being encircling, not in color in a scene and is outlasting roasting and the cover rose, please be that there always asked was so hoary and annoyance, a pin sought long slender butter, not even with salt be carved clear, this is hardness and not shown by any other is that there no excitement and determination. Hope in everything. May not all that has the insistence is surely there is the way to a shame, it and trying and curved, cake and oat-meal. Pain soup, no greater when the division between curves and resumed and more mixture than a stairway, a growth of reversible sizing and red with pit, pit on in climate and not widened and a cover. Supposing a design which is more likely to be narrowly. This makes readiness and in resting recreation to be steady. In between the curtain.
</p>


Now an example of that treatment on Portrait of a Lady, the complete text:

<p style="font-family: 'courier'">
CHAPTER XXXIV One of glossy ringlets. She was all one had to be confessed for your father would immediately came upon too,” said the elder brother. “Very good thing as her way back to think me a conception of him, whoever he forbade me to listen. “I hope you’ll like cold breath of an inconvenient entailed place again and yet a complex operation, and then, Pansy?” “He isn’t proper and, after all; and she really acute white doors, the young lady travelling at least idea of a moment, “Shall I was welcome you say.” “Satisfactory woman!--I mean to marry Lord Warburton didn’t you not deliver me I come home in the sentiment easily have admitted that last hours?” “You’ve the best. “If I understand me.” “He’s not to me that suggested there was indeed with bitterness. “You don’t know what she abstained from time when they were not afraid you’re afraid or consolation. He’s a little boys and the temporary absence, was enough to the child. Mr. Osmond’s traditions--it was profane in life. Then Miss Archer has so needlessly in--!” she often seemed quite against me.”
</p>



For me, the chopped ‘n screwed Stein has very much the appearance of Stein, but with a kind of sterility of meaninglessness. In a certain way, it is a nice counter-argument to the ungenerous notion that sometimes-ungenerous-me sometimes has about Stein, that it is but a random chopping-together of words. When contrasted to an actual random chop, it is clear that our dear original has something 'more' behind it. This ‘versioning’ of Portrait of a Lady has the just-floating-above-nonsense quality of when they make you read a ‘real’ novel in like, level 2 or 3 of a foreign language class, and you get that it is about, like, some woman who wants a man or something, but you are terrified they will call on you to actually explain something about it. Doing this to my weird passage of underlined sentences offers something a little better but with a sort of constrainedness of vocabulary and structure.

<p style="font-family: 'courier'">
An innocent pastime. What I mean, so as honest as iron. A feeling of the other one did. The expression of snail-train they call the word that he doesn’t talk. He has a character. I can’t see it was too man in the intruder. But it a Unitarian minister. Who had gleamed. An innocent pastime. What I don’t touch you. Oh the word of command. ’Not when even Beethoven has nothing to perform even Beethoven has about the mask of her out. She was as honest as if an novel. The bottomless idiocy of early news. And yet I don’t touch you. Oh yes, we are moments in a character. I have visitors,’ said Isabel, ‘getting up to us. I mean by the conventional. The bottomless idiocy of one’s pocket handkerchief. As the best in a lord. I mean, so as something detected. But the world.  An uneradicated predilection for her. Even Gilbert Osmond’s rich devices had too expensive. I should discover of a kind.
</p>

So what I did was to copy and paste my little passage of underlinelets 304 times into a text file with the entirety of Portrait, such that the underlinelets were of equal weight to the text itself. This yielded the most fun results!, I think:

<p style="font-family: 'courier'">
An eye that after my great step in the best in earnest with herself. This person, of a huge, magnificent and the interest in a certain fear. She won’t reproduce me, as mine. If she had lived, and afterwards was never know what she seemed less than he was one of command.’Not when he has about her mind. But in public, a kind of at all accurate; she was altogether, lean and teaching it a good deal in novels. A cluster of exclusion. She had effected that strains and the bank. Always closely buttoned and her and would have a great step in certain formal tribute to the snuffers. Afflicted with an angel had a button is to them in earnest with England. You can’t see what she had let me that last min--” Henrietta that I delight in a good deal to grapple in the ardour that she was a hand. The reader has nothing for a radical newspaper or of a rich devices had often wondered whether his eyes of reduplication. In a sort of sequestration there are as good deal, but he was morally certain fear. She shook hands arranged its face. She was she, but.
</p>
<br></br>
<p style="font-family: 'courier'">
An uneradicated predilection for instance, a button is as mine. If she was as mine. If she evidently impregnated with golden eggs. I should go to a fancy to halt, to make people are moments in much interested in the disadvantages of what. Blurred and large balance at large balance at about to her much-embracing refuge. Gardencourt where Doctor Johnson had no traditions, and the conventional. The scene expressed this made an idea was because she heard herself was she, but he bent forward it known the commonplace. She was even more confidence. Her impressions you were not its extent. It was she, but not its face. She had gone out; she avoided him; she were numerous. The elation of a pleasant correspondence. I never know she received some other trouble for marrying him. He had she clung to. I’ve been expected of liberty and I shall go to halt, to her preferences and was not believing it, she was glad to suggest what you know, doesn’t ask you would go, of the first position to the clock-face. Grouped unconsciously and the “office” still drawing-room, and teaching it to Mrs. Touchett declared, “she has nothing to know what you may already.
</p>
<br></br>
<p style="font-family: 'courier'">
An innocent pastime. What I came from the intruder. But it to grapple in the other one sitting posture, bending his sense of the court together with her; and something to be termed a member of one’s pocket handkerchief. As the intimation that denoted quick perception. It’s just like having a cousin, but he had fairly seen him that he was an incident in their marriage; and desultory gleams. It was a few words had no interested in the prettier of my saying that, and produced in almost a moment that had never been a moat. The modern world’s very different from her companion’s eyes. “Another reason that if she seemed to the quaint as she had lost upon her, she was in training it must get out some day, had never been in the other one name is as good Christian, _monsieur_.” Her sentiments were numerous. The elation of submission. When you’re very affected of flowers. He was the most vividly. She was intrinsic enough. Look as if we are not normally deemed human. If I delight to advance, to prove that supplies me that path lost an hour; he talks, perhaps, as if an angel had tried to.
</p>


So these paragraphs are neither Jamesian, nor Steinien, nor really English.  To my small mind though, the Portrait + Underlinelets and the Tender Buttons ones have, in their shared meaningless sterility, certain kinds patterns, rhythms, turns of phrases in common. I am proposing that maybe Stein read James in a certain kind of rhythmic way, and that this rhythm perhaps lodged itself in her head and maybe escaped in fits and bursts as she wrote texts that, unlike my Markovian ones, are full of profound meaning. That is, chopped and screwed Portrait + Underlinelets not not resemble Stein proper -- chopped and screwed P+U only resembles chopped and screwed Stein. Or maybe just moments in both chopped and screwed resemble each other.

What does that last bit really mean? Probably not much. (Don’t worry. I don’t believe myself very much.) At best it’s a fun kind of weird demonstration of how certain kinds of phraseologies in James resemble certain kinds of phraseologies in Stein – a sort of overlapping of certain verbal moments, a kind of influential borrowing. At worst it’s a fun kind of weird demonstration of nothing except how fun it is to play around with words in code, and see what comes out.

THE END.
