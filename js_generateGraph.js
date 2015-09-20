var graph = {
  LAX: ['LAS', 'PHX'],
  LAS: ['LAX', 'PHX', 'DEN'],
  PHX: ['LAX', 'LAS','DEN', 'ORD', 'DFW'],
  DFW: ['PHX', 'ORD', 'HOU'],
  HOU: ['DFW', 'ORD', 'ATL', 'MCO'],
  MCO: ['HOU', 'ATL', 'JFK'],
  JFK: ['MCO', 'ATL', 'ORD'],
  ORD: ['JFK', 'ATL', 'HOU', 'DFW', 'PHX', 'DEN'],
  DEN: ['LAS', 'PHX', 'ORD'],
  ATL: ['ORD', 'JFK', 'MCO', 'HOU']
}

