from pathlib import Path
from setting import Data_Root
all:list[str] = []
for root in Data_Root:
    p = Path(root)
    all.extend(list(p.glob('*.db')))
print(all)
