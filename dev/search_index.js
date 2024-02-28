var documenterSearchIndex = {"docs":
[{"location":"","page":"MPSGE","title":"MPSGE","text":"CurrentModule = MPSGE_MP","category":"page"},{"location":"#MPSGE","page":"MPSGE","title":"MPSGE","text":"","category":"section"},{"location":"","page":"MPSGE","title":"MPSGE","text":"Documentation for MPSGE.","category":"page"},{"location":"","page":"MPSGE","title":"MPSGE","text":"","category":"page"},{"location":"","page":"MPSGE","title":"MPSGE","text":"Modules = [MPSGE_MP]","category":"page"},{"location":"#MPSGE_MP.build!-Tuple{MPSGEModel}","page":"MPSGE","title":"MPSGE_MP.build!","text":"build!(M::MPSGEModel)\n\nCurrently, I'm creating the variables when the sector is added to the model. However, I think we can do this here without issue. I would prefer doing it here.\n\n\n\n\n\n","category":"method"},{"location":"#MPSGE_MP.extract_scalars-Tuple{MPSGE_MP.MPSGEScalarVariable}","page":"MPSGE","title":"MPSGE_MP.extract_scalars","text":"extract_scalars\n\nTakes a variable and extracts it the sub-variables. \n\n\n\n\n\n","category":"method"},{"location":"#MPSGE_MP.production_sectors-Tuple{MPSGEModel}","page":"MPSGE","title":"MPSGE_MP.production_sectors","text":"production_sectors(m::MPSGEModel)\n\nReturn all sectors that have a corresponding production block.  These are coming from a dictionary, so order is not guaranteed.\n\nThis is primarily used when generating constraints.\n\n\n\n\n\n","category":"method"},{"location":"#MPSGE_MP.sectors-Tuple{Commodity}","page":"MPSGE","title":"MPSGE_MP.sectors","text":"sectors(C::Commodity)\n\nReturn only the sectors that have the input commodity in their production block. \n\nThis is an optimization in building the model as the structure is very sparse  iterating over all sectors is expensive.\n\n\n\n\n\n","category":"method"},{"location":"#MPSGE_MP.sectors-Tuple{MPSGEModel}","page":"MPSGE","title":"MPSGE_MP.sectors","text":"sectors(m::MPSGEModel)\n\nReturn all sectors in a model\n\n\n\n\n\n","category":"method"},{"location":"#MPSGE_MP.solve!-Tuple{MPSGE_MP.AbstractMPSGEModel}","page":"MPSGE","title":"MPSGE_MP.solve!","text":"solve!(m::abstract_mpsge_model; keywords)\nFunction to solve the model. Triggers the build if the model hasn't been built yet.\n\nExample\n\njulia> solve!(m, cumulative_iteration_limit=0)\n\n\n\n\n\n","category":"method"},{"location":"how_it_works/#How-MPSGE-Works","page":"How MPSGE Works","title":"How MPSGE Works","text":"","category":"section"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"Work in progress","category":"page"},{"location":"how_it_works/#Constructing-Equations","page":"How MPSGE Works","title":"Constructing Equations","text":"","category":"section"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"Consider a production block on sector S. This block will have an input tree and output tree. The generated equations are different for inputs vs outputs.  However, they only differ up to a sign in certain locations. Let ","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"epsilon = leftbeginarraycl\n    -1  textTree is input \n     1  textTree is output\nendarrayright","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"represent this sign. ","category":"page"},{"location":"how_it_works/#Compensated-Demand","page":"How MPSGE Works","title":"Compensated Demand","text":"","category":"section"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"Consider a netput tree containing a single nest and k children, either commodities or  nests, as in the Figure below. ","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"(Image: \"one_level_tree\")","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"Each child node has a quantity q_i. Each commodity node has a reference price p_i,  base quantity Q_i, reference quantity q_i=p_icdot Q_i, variable C_i,  and taxes t_ih, where the index h is a consumer. Then q = sum q_i  is the quantity of the root n. The root also has an elasticity sigma.","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"The cost function for a commodity node n_i will be given by pi(nC_i) where","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"pi(nC_i) = fracC_i(1-epsilonsum_h t_ih)p_i","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"This must be indexed by both the parent nest and commodity as commodities can appear in a netput tree multiple times, albeit not directly under the same nest. The cost function for any non-commodity child node is defined recursively in this manner. This is well defined as all leaves are commodities.","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"The cost function on the root n, C(n), depends on the elasticity of the root. If sigma=1, the cost function is given by Cobb-Douglass","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"  C(n) =  prod_i=1^k pi(nC_i)^fracq_iq","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"And if sigmane1 then we use a CES cost function","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"C(n) = \n        left(sum_i=1^k fracq_iq pi(nC_i)^1+epsilonsigmaright)^frac11+epsilonsigma","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"In general, these trees can be highly nested. Consider a path from the root, n_1 to a leaf n_k+1. Using this we can calculate the compensated demand, CD(SCn_k), for the sector S, commodity C and nest n_k","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"CD(SCn_k) = -epsilon Q_C left(fracC(n_k)pi(n_kC)right)^-epsilonsigma_k prod_i=1^k-1 left(fracC(n_i)C(n_i+1)right)^-epsilonsigma_i","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"Finally, the compensated demand, CD(SC), is the summation over all nests that have C as a leaf.","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"CD(SC) = sum_substackntext nest textif (nC)text is an edge CD(SCn)","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"For convenience we take any compensated demand not defined above to be 0, this follows from the empty summation in CD(SC).","category":"page"},{"location":"how_it_works/#\\tau","page":"How MPSGE Works","title":"tau","text":"","category":"section"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"For sector S and consumer H define ","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"tau(SH) = - sum_substackCintext Commoditiesnintext nests CD(SCn)cdot t_SCHncdot C","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"where t_SCHn is the tax on the commodity C by consumer H in sector S  under nest n.","category":"page"},{"location":"how_it_works/#Endowments/Demands","page":"How MPSGE Works","title":"Endowments/Demands","text":"","category":"section"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"For commodity C and consumer H define E(HC) to be the endowment quantity. This is taken to be 0 if there is no endowment for H and C.","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"Let q_C be the quantity of demand for commodity C in H consumer demand and q = sum_C q_C be the total demand. Define the demand function, D(HC), as","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"    D(HC) = fracq_Cqcdot fracHC","category":"page"},{"location":"how_it_works/#Constraints","page":"How MPSGE Works","title":"Constraints","text":"","category":"section"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"With these definitions, we can define the complementarity constraints. ","category":"page"},{"location":"how_it_works/#Zero-Profit","page":"How MPSGE Works","title":"Zero Profit","text":"","category":"section"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"Let S be a sector with a production block, then the zero profit condition is  given by,","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"left(-sum_Cintext CommoditiesCD(SC)cdot Cright) + sum_Hintext Consumers tau(SH) perp S","category":"page"},{"location":"how_it_works/#Market-Clearance","page":"How MPSGE Works","title":"Market Clearance","text":"","category":"section"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"Let C be a commodity, then the market clearance condition is given by,","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"left(sum_Sintext Sectors CD(SC)cdot S right) - sum_Hintext Consumers E(HC) - D(HC) perp C","category":"page"},{"location":"how_it_works/#Income-Balance","page":"How MPSGE Works","title":"Income Balance","text":"","category":"section"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"Let H be a consumer, then the income balance condition is given by,","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"H - left(sum_Cintext Commodities E(HC)cdot C - sum_Sintext Sectorstau(SH)cdot Sright) perp H","category":"page"},{"location":"how_it_works/#Production-Blocks","page":"How MPSGE Works","title":"Production Blocks","text":"","category":"section"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"Production blocks represent two trees: Input and output. ","category":"page"},{"location":"how_it_works/","page":"How MPSGE Works","title":"How MPSGE Works","text":"Prod: A ","category":"page"}]
}
