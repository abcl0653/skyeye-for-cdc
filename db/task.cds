namespace cdc;
using {cdc.Grids} from './master';

entity Tasks  {
    key ID: Integer;
    name: String(20);
    grid: Association to Grids;
}

