const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

//starts the game
function startGame() {
//empty
  state = {}
  //starts the first text
  showTextNode(1)
}

//shows the options
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}
//takes which option we select
function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Du våknet opp, sliten etter fekte kampen fra i går. Du ser flasken din med tran!',
    options: [
      {
        text: 'Du orker ikke å ta tranen nå, men du tar den med deg.',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Nei, æsj! Hvem tar med seg tran!',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Du drar på deg den tunge rustningen. Og går ut av hytta, som du fikk låne av Milda. ' + 
    ' Søren, du er stiv. Kanskje han fyren i boden der selger en salve til deg!',
    options: [
      {
        text: 'Han peker på Tranen din. Han vil gjerne bytte den i mot med ett sverd!',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Spørr om han vil bytte tranen med ett skjold!',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Ignorer han rare mannen i boden.',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Etter er stund kom du fram til slottet. Men du er så sliten, og støl!',
    options: [
      {
        text: 'Shit au, prøv å redd prinsesse Maximilian med en gang!',
        nextText: 4
      },
      {
        text: 'Bare legg deg ned på bakken der du er, og ta en kjapp lur!.',
        nextText: 5
      },
      {
        text: 'Dra tilbake til hytta til milda, og slapp av litt til.',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Du ble så sliten, at du sovnet da du utforsket slottet. Og monstrene tok deg.',
    options: [
      {
        text: 'Prøv igjen.',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Da du sovnet, kom det en gjeng av banditer som tok alt du eide! Du mistet alt, og du frøs i hjel.',
    options: [
      {
        text: 'Er du dum eller! Prøv på nytt.',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Du våkner opp og føler deg i top form! Du er nå klar til å utforske slottet, og redde prinsesse Maximilian!',
    options: [
      {
        text: 'Gå opp til slottet!',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'Når du var på vei mot Prinsesse Maximilians sitt tårn, møtte du på en stor og skummel drage!',
    options: [
      {
        text: 'LØP UNDA!!',
        nextText: 8
      },
      {
        text: 'Heldig vis bytta du ut tranen! Du kan angripe dragen med sverdet!',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Gjem deg bak sjoldet ditt! ',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Kast tranen på dragen!',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Dragen var ganske så mye raskere enn deg. Dragen tok deg.',
    options: [
      {
        text: 'Huff og huff! Du klarte det nesten!',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Sverdet var altfor tungt, du klarte ikke å bruke det! Dragen spiste deg.',
    options: [
      {
        text: 'Huff og huff! Du klarte det nesten!',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Dragen lo og kalte deg feig! Dragen spiste deg opp, i ett jafs.',
    options: [
      {
        text: 'Huff og huff! Du klarte det nesten',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Du kaster tranen du hadde med deg! heldigvis liker ingen tran, så dragon gråt, og fløy sin vei! Ridder Mathea klarte å redde Maximilian! Ridderen Mathea og Prinsesse Maximilian, leve kranglete i alle sine krangle dager. Slutt.',
    options: [
      {
        text: 'Gratulerer du vant!',
        nextText: -1
      }
    ]
  }
]

startGame()